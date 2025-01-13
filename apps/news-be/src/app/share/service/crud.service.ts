import { PaginatedAndSortResponse } from '../dto/PaginatedAndSortResponse.dto';
import { PaginatedAndSortParams } from '../dto/PaginatedAndSortParams.dto';

export interface CRUDServiceInterface {
  gets<I extends PaginatedAndSortParams, T>(
    params: I
  ): Promise<PaginatedAndSortResponse<T>>;
  get<T>(id: number): Promise<T>;
  create(data: any): Promise<any>;
  update(data: { id: number } & Partial<any>): Promise<any>;
  delete(id: number): Promise<void>;
}
