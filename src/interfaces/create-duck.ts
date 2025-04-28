export interface IState {
  data?: Record<string, any>;
  loading: boolean;
  error: string | null;
}

export interface ICreateRequest {
  postData: Record<string, any>;
  onSuccess?: Function;
  onFailure?: Function;
}

export interface ISuccessAction {
  data?: Record<string, any>;
}

export interface IFailureAction {
  error: string;
}
