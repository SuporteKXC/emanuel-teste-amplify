export interface Pagination {
  total: number;
  perPage: number;
  page: number;
  lastPage: number;
  currentPage?: number;
  lastUpdate?: Date;
}
