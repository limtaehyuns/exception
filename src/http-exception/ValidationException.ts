import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(value: string) {
    super(value ?? 'VALIDATION_FAILED', HttpStatus.BAD_REQUEST);
  }
}
