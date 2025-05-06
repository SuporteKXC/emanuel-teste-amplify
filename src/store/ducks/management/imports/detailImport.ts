import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { ImportListData, ImportListQuery } from "contracts/management";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "Detail_IMPORTS_",
  }
);

export const ImportDetailTypes = Types;
export const ImportDetailActions = Creators;

export interface ImportDetailState {
  data: ImportListData | null;
  loading: boolean;
  error: string | null;
}
export interface ImportDetailRequestAction {
  query?: ImportListQuery;
  error: string | null;
  onSuccess?: (data: ImportListQuery) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ImportListData;
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: ImportDetailState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: ImportDetailState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ImportDetailState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
};

const _failure = (state: ImportDetailState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const importDetail = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
