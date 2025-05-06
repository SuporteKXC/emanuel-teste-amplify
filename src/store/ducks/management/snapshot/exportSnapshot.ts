import { CamelPagination } from 'contracts';
import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type {
  SnapshotExportData,
  SnapshotExportQuery,
} from "contracts/management";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure", "onLoad"],
    load: ['progress'],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "EXPORT_SNAPSHOTS_",
  }
);

export const SnapshotExportTypes = Types;
export const SnapshotExportActions = Creators;

export interface SnapshotExportState {
  data: SnapshotExportData[] | null;
  pagination?: CamelPagination;
  loading: boolean;
  error: string | null;
  progress?: any | null;
}
export interface SnapshotExportRequestAction {
  query?: SnapshotExportQuery;
  error: string | null;
  onSuccess?: (data: SnapshotExportData) => void;
  onFailure?: () => void;
  onLoad?: (progress?: string | number) => void;
}

interface SuccessAction {
  data: SnapshotExportData[];
  pagination: CamelPagination;
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: SnapshotExportState = {
  data: null,
  loading: false,
  error: null,
  progress: 0,
};

const _request = (state: SnapshotExportState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: SnapshotExportState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    progress: { $set: 0 },
    data: { $set: action.data },
  });
};

const _load = (state: any, action: any) => {
  return update(state, {
    progress: { $set: action.progress },
  });
};

const _failure = (state: SnapshotExportState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
    progress: { $set: 0 },
  });

const _reset = () => INITIAL_STATE;

export const snapshotExport = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.LOAD]: _load,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});