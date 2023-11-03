import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationException } from './http-exception/ValidationException';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';
import { validate } from 'class-validator';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      validatorPackage: {
        validate: async function (
          object: unknown,
          validatorOptions?: ValidatorOptions,
        ): Promise<ValidationError[]> {
          if (typeof object === 'object') {
            const validateResult = await validate(object, validatorOptions);
            const flatted = validateResult
              .map((error) => {
                const { constraints } = error;
                return Object.keys(constraints);
              })
              .flat();

            flatted.forEach((key) => {
              const errorType = Reflect.getMetadata(`${key}:exception`, object);
              console.log(errorType);
              if (errorType) {
                throw new ValidationException(errorType);
              }
            });

            return validateResult;
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
