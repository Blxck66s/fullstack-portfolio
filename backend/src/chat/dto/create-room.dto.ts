import { IsAlphanumeric, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  name: string;
}
