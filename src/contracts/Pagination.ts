export interface Pagination {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
  lastUpdate?: string;
}

export interface PaginationParams {
  [prop: string]: Record<string, any>;
}
