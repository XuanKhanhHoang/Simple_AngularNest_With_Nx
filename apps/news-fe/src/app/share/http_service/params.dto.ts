export interface GetNewsParams {
  id?: number;
  sort_by?: string;
  title?: string;
  author_name?: string;
  create_at?: string;
  author_id?: number;
  category_id?: number;
  page?: number;
}
