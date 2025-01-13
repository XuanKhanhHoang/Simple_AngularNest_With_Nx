import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { ValidationOptions } from 'class-validator';

export function TransformToNumber(validationOptions?: ValidationOptions) {
  return Transform(({ value }) => {
    const number = Number(value);
    if (isNaN(number)) {
      throw new BadRequestException('Invalid number format');
    }
    return number;
  }, validationOptions);
}
