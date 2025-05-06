import type { FindMany } from 'contracts';

export interface Pagination {
  readonly total: number;
  readonly per_page: number;
  readonly current_page: number;
  readonly last_page: number;
  readonly first_page: number;
  readonly first_page_url: string;
  readonly last_page_url: string;
  readonly next_page_url: string | null;
  readonly previous_page_url: string | null;
}

export interface CamelPagination {
  readonly total: number;
  readonly perPage: number;
  readonly currentPage: number;
  readonly lastPage: number;
  readonly firstPage: number;
  readonly firstPageUrl: string;
  readonly lastPageUrl: string;
  readonly nextPageUrl: string | null;
  readonly previousPageUrl: string | null;
}

export interface PaginationParams {
  [prop: string]: FindMany;
}
