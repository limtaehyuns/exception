import { HttpException, HttpStatus } from '@nestjs/common';

export class MockException extends HttpException {
  constructor() {
    super('MOCK_EXCEPTION', HttpStatus.FORBIDDEN);
  }
}
