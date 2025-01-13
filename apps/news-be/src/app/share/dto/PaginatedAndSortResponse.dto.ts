export interface PaginatedAndSortResponse<T> {
  data: T[];
  total_page: number;
  page: number;
}
