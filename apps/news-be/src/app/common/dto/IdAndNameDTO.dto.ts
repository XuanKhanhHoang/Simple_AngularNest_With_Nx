import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class IdAndNameDTO {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Transform(({ value }) => {
    return Number(value);
  })
  id: number;

  @IsNotEmpty()
  name: string;
}
