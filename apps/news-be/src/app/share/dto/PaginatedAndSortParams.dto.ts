import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { TransformToNumber } from '../decorators/TransformToNumber.decorator';

export class PaginatedAndSortParams {
  @IsNumber()
  @IsOptional()
  @TransformToNumber()
  limit?: number;

  @IsNumber()
  @IsOptional()
  @TransformToNumber()
  page?: number;
  @IsOptional()
  sort_by?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort_type?: 'asc' | 'desc';
}
