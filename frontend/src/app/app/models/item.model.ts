export interface Item {
  id: number;
  title: string;
  description?: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Paginated<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/** DTOs para llamadas */
export type CreateItemDto = Pick<Item, 'title' | 'description' | 'tags'>;
export type UpdateItemDto = Partial<CreateItemDto>;

/** Útil para inicializar formularios */
export const emptyItem = (): CreateItemDto => ({
  title: '',
  description: null,
  tags: []
});
