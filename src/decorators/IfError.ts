import { applyDecorators } from '@nestjs/common';

export function IfError(data) {
  console.log(data);
  return applyDecorators();
}
