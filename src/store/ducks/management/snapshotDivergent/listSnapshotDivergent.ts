import { CamelPagination } from 'contracts';
import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type {
  SnapshotDivergentListData,
  SnapshotDivergentListQuery,
} from "contracts/management";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "LIST_SNAPSHOT_DIVERGENT_",
  }
);

export const SnapshotDivergentListTypes = Types;
export const SnapshotDivergentListActions = Creators;

export interface SnapshotDivergentListState {
  data: SnapshotDivergentListData[] | null;
  pagination?: CamelPagination;
  loading: boolean;
  error: string | null;
}
export interface DivergentListRequestAction {
  query?: SnapshotDivergentListQuery;
  error: string | null;
  onSuccess?: (data: SnapshotDivergentListData) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: SnapshotDivergentListData[];
  pagination: CamelPagination;
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: SnapshotDivergentListState = {
  data: null,
  pagination: undefined,
  loading: false,
  error: null,
};

const _request = (state: SnapshotDivergentListState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: SnapshotDivergentListState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    pagination: { $set: action.pagination },
  });
};

const _failure = (state: SnapshotDivergentListState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const snapshotDivergentList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
