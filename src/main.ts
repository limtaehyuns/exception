import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationException } from './http-exception/ValidationException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const messages = validationErrors
          .map((error) => `${Object.values(error.constraints).join(', ')}`)
          .join(', ');

        return new ValidationException(messages);
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
