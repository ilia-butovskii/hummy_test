import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CoffeeImageResponseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  src: string;
}
