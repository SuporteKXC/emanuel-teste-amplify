import { CamelPagination } from "contracts";
import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { SnapshotListData, SnapshotListQuery } from "contracts/management";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "LIST_SNAPSHOTS_",
  }
);

export const SnapshotListTypes = Types;
export const SnapshotListActions = Creators;

export interface SnapshotListState {
  data: SnapshotListData[] | null;
  pagination?: CamelPagination;
  loading: boolean;
  error: string | null;
}
export interface SnapshotListRequestAction {
  query?: SnapshotListQuery;
  error: string | null;
  onSuccess?: (data: SnapshotListData) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: SnapshotListData[];
  pagination: CamelPagination;
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: SnapshotListState = {
  data: null,
  pagination: undefined,
  loading: false,
  error: null,
};

const _request = (state: SnapshotListState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: SnapshotListState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    pagination: { $set: action.pagination },
  });
};

const _failure = (state: SnapshotListState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const snapshotList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
