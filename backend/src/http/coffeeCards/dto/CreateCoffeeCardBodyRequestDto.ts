import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCoffeeCardBodyRequestDto {
  @IsString()
  @IsNotEmpty()
  blendName: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  intensifier: string;

  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  notes: string[];

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  variety: string;
}
