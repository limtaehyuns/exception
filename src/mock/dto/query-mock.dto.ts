import { IsNotEmpty, IsString } from 'class-validator';
import { IfException } from 'src/decorators/IfError';

export class QueryMockDto {
  @IsString({ message: 'QUERY_IS_MUST_BE_STRING' })
  @IfException('isString', 'ㅁㄴㅇㄹ')
  @IsNotEmpty({ message: 'QUERY_IS_NOT_NULL' })
  @IfException('isNotEmpty', 'ss')
  query: string;

  @IsString({ message: 'TEST_IS_MUST_BE_STRING' })
  @IsNotEmpty()
  test: string;
}
