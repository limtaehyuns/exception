import { SetMetadata, applyDecorators } from '@nestjs/common';

export const IfException = (decoratorName: string, exception: string) =>
  applyDecorators(SetMetadata(`${decoratorName}:exception`, exception));
