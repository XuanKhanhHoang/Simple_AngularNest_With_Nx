import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { CreateNewsDTO } from './CreateNews.dto';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
export class UpdateNewsDTO extends CreateNewsDTO {
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (!value) throw new BadRequestException();
    return Number(value);
  })
  id: number;
}
