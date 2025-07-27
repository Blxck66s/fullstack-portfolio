import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class MessagePaginationDto {
  @Transform(({ value }) => +value || 1)
  @IsNumber()
  page: number;

  @Transform(({ value }) => +value || 10)
  @IsNumber()
  take: number;
}
