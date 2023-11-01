import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor() {
    super('VALIDATION_FAILED', HttpStatus.BAD_REQUEST);
  }
}
