export interface PaginatedAndSortResponse<T> {
  data: T[];
  total_page: number;
  page: number;
}
export interface NameAndIdObject {
  name: string;
  id: number;
}
export interface UpdateNewsDTO extends CreateNewDTO {
  id: number;
}
export interface CreateNewDTO {
  title: string;
  author_id: string;
  category_ids: number[];
  content: string;
}
