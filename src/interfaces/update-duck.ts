export interface IState {
  loading: boolean;
  error: string | null;
}

export interface IUpdateRequest {
  id: string | number;
  putData: Record<string, any>;
  onSuccess?: Function;
  onFailure?: Function;
}

export interface ISuccessAction {}

export interface IFailureAction {
  error: string;
}
