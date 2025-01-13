export interface News {
  id: number;
  create_at: string;
  title: string;
  content: string;
  category_refs: ({
    category: {
      id: number;
      name: string;
    };
  } & {
    category_id: number;
    product_id: number;
  })[];
  author: {
    id: number;
    name: string;
  };
}
