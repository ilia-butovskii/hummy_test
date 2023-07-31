import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class CoffeeCardResponseDto {
  @Expose({ name: '_id' })
  @Type(() => String)
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  uid: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  blendName: string;

  @Expose({ name: '_coffeeImage' })
  @Type(() => String)
  @IsNotEmpty()
  image: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  intensifier: string;

  @Expose()
  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  notes: string[];

  @Expose()
  @IsString()
  @IsNotEmpty()
  origin: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  variety: string;
}
