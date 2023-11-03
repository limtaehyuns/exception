import { SetMetadata, applyDecorators } from '@nestjs/common';

export const IfException = (exception: string) =>
  applyDecorators(SetMetadata('exception', exception));
