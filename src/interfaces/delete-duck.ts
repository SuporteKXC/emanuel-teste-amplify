export interface IState {
  loading: boolean;
  error: string | null;
}

export interface IDeleteRequest {
  id: string | number;
  onSuccess?: Function;
  onFailure?: Function;
}

export interface ISuccessAction {}

export interface IFailureAction {
  error: string;
}
