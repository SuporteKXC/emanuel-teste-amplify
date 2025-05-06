import { CamelPagination } from 'contracts';
import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type {
  SnapshotDivergentExportData,
  SnapshotDivergentExportQuery,
} from "contracts/management";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    load: ["progress"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "EXPORT_SNAPSHOT_DIVERGENT_",
  }
);

export const SnapshotDivergentExportTypes = Types;
export const SnapshotDivergentExportActions = Creators;

export interface SnapshotDivergentExportState {
  data: SnapshotDivergentExportData[] | null;
  pagination?: CamelPagination;
  loading: boolean;
  error: string | null;
  progress?: number | null;
}
export interface DivergentExportRequestAction {
  query?: SnapshotDivergentExportQuery;
  error: string | null;
  onSuccess?: (data: SnapshotDivergentExportData) => void;
  onFailure?: () => void;
  onLoad?: (progress?: string | number) => void;
}

interface SuccessAction {
  data: SnapshotDivergentExportData[];
  pagination: CamelPagination;
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: SnapshotDivergentExportState = {
  data: null,
  pagination: undefined,
  loading: false,
  error: null,
  progress: 0,
};

const _request = (state: SnapshotDivergentExportState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: SnapshotDivergentExportState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    pagination: { $set: action.pagination },
    progress: { $set: 0 },
  });
};

const _load = (state: any, action: any) => {
  return update(state, {
    progress: { $set: action.progress },
  });
};

const _failure = (state: SnapshotDivergentExportState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
    progress: { $set: 0 },
  });

const _reset = () => INITIAL_STATE;

export const snapshotDivergentExport = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.LOAD]: _load,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
