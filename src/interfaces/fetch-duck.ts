export interface IState {
  data: Record<string, any> | null;
  loading: boolean;
  error: string | null;
}

export interface IFechRequest {
  id: string | number;
  onSuccess?: Function;
  onFailure?: Function;
}

export interface ISuccessAction {
  data: Record<string, any>;
}

export interface IFailureAction {
  error: string;
}
