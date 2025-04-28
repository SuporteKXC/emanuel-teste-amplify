export interface IState {
  data: Record<string, any>[];
  loading: boolean;
  error: string | null;
}

export interface IExportRequest {
  query?: Record<string, any>;
  onSuccess?: Function;
}

export interface ISuccessAction {
  data: Record<string, any>[];
}

export interface IFailureAction {
  error: string;
}