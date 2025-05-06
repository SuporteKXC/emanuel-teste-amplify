import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

const { Types, Creators } = createActions(
  {
    request: ['key','onSuccess','onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'USER_FETCH_IMAGE',
  }
);

export const FetchUserImageTypes = Types;
export const FetchUserImageActions = Creators;

export interface FetchUserImageState {
  data: string | null;
  loading: boolean;
  error: string | null;
}

export interface FetchUserImageRequestAction {
  key: string;
  error: string | null;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: string;
}

interface FailureAction {
  error: string;
}

const INITIAL_STATE: FetchUserImageState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: FetchUserImageState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: FetchUserImageState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: FetchUserImageState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const userImage = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });