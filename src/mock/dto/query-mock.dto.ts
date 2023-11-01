import { IsNotEmpty, IsString } from 'class-validator';

export class QueryMockDto {
  @IsString({ message: 'QUERY_IS_MUST_BE_STRING' })
  @IsNotEmpty({ message: 'QUERY_IS_NOT_NULL' })
  query: string;

  @IsString({ message: 'TEST_IS_MUST_BE_STRING' })
  @IsNotEmpty({ message: 'TEST_IS_NOT_NULL' })
  test: string;
}
