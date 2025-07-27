import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class RoomPaginationDto {
  @Transform(({ value }) => +value || 1)
  @IsNumber()
  page: number;

  @Transform(({ value }) => +value || 5)
  @IsNumber()
  take: number;
}
