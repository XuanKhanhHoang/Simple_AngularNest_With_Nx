import { IsIn, IsNumber, IsOptional, Min } from 'class-validator';
import { PaginatedAndSortParams } from '../../share/dto/PaginatedAndSortParams.dto';
import { TransformToNumber } from '../../share/decorators/TransformToNumber.decorator';
export class GetNewsParamsDTO extends PaginatedAndSortParams {
  @Min(1)
  @TransformToNumber()
  @IsNumber()
  @IsOptional()
  id?: number;
  @IsOptional()
  @IsIn(['createAt', 'title'])
  sort_by?: string;
  @IsOptional()
  title?: string;
  @IsOptional()
  author_name?: string;
  @IsOptional()
  create_at?: string;
  @IsOptional()
  @TransformToNumber()
  @IsOptional()
  author_id?: number;
  @IsOptional()
  category_id?: number;
}
