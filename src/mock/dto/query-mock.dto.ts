import { IsNotEmpty, IsString } from 'class-validator';

export class QueryMockDto {
  @IsString()
  @IsNotEmpty()
  query: string;
}
