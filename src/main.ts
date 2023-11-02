import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationException } from './http-exception/ValidationException';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';
import { validate } from 'class-validator';
import { Reflector } from '@nestjs/core';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = new Reflector();

  app.useGlobalPipes(
    new ValidationPipe({
      validatorPackage: {
        validate: function (
          object: unknown,
          validatorOptions?: ValidatorOptions,
        ): ValidationError[] | Promise<ValidationError[]> {
          if (typeof object === 'object') {
            console.log(reflector.get('role));
            return validate(object, validatorOptions);
          }
          throw new Error('Function not implemented.');
        },
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const messages = validationErrors
          .map((error) => `${Object.values(error.constraints).join(',')}`)
          .join(',');

        return new ValidationException(messages);
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
