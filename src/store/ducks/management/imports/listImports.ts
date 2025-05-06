import { CamelPagination } from "contracts";
import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { ImportListData, ImportListQuery } from "contracts/management";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "LIST_IMPORTS_",
  }
);

export const ImportListTypes = Types;
export const ImportListActions = Creators;

export interface ImportListState {
  data: ImportListData[] | null;
  pagination?: CamelPagination;
  loading: boolean;
  error: string | null;
}
export interface ImportListRequestAction {
  query?: ImportListQuery;
  error: string | null;
  onSuccess?: (data: ImportListData) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ImportListData[];
  pagination: CamelPagination;
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: ImportListState = {
  data: null,
  pagination: undefined,
  loading: false,
  error: null,
};

const _request = (state: ImportListState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ImportListState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    pagination: { $set: action.pagination },
  });
};

const _failure = (state: ImportListState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const importList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
