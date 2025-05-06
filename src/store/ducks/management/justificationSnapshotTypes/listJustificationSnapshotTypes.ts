// import { CamelPagination } from 'contracts';
import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type {
  JustificationSnapshotTypesListData,
} from "contracts/management";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "LIST_JUSTIFICATION_SNAPSHOT_TYPES_",
  }
);

export const JustificationSnapshotTypesListTypes = Types;
export const JustificationSnapshotTypesListActions = Creators;

export interface JustificationSnapshotTypesListState {
  data: JustificationSnapshotTypesListData[] | null;
  // pagination?: CamelPagination;
  loading: boolean;
  error: string | null;
}
export interface JustificationSnapshotTypesListRequestAction {
  query?: any;
  error: string | null;
  onSuccess?: (data: JustificationSnapshotTypesListData) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: JustificationSnapshotTypesListData[];
  // pagination: CamelPagination;
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: JustificationSnapshotTypesListState = {
  data: null,
  // pagination: undefined,
  loading: false,
  error: null,
};

const _request = (state: JustificationSnapshotTypesListState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: JustificationSnapshotTypesListState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    // pagination: { $set: action.pagination },
  });
};

const _failure = (state: JustificationSnapshotTypesListState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const justificationSnapshotTypeList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
