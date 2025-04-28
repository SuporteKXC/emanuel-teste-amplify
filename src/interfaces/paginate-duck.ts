import { Pagination } from "./pagination";

export interface IState {
  data: Record<string, any>[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
}

export interface IPaginateRequest {
  query?: Record<string, any>;
}

export interface ISuccessAction {
  data: Record<string, any>[];
  pagination: Pagination;
}

export interface IFailureAction {
  error: string;
}
