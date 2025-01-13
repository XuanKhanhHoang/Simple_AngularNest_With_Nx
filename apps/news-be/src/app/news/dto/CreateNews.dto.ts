import { IsNotEmpty, IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';
import { TransformAndValidateDate } from '../../share/decorators/TransformToDate.decorator';

export class CreateNewsDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @TransformAndValidateDate()
  create_at: Date;

  @IsNumber()
  author_id: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  category_ids: number[];
}
