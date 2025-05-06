import { CamelPagination } from 'contracts';
import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type {
  ImportExportData,
  ImportExportQuery,
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
    prefix: "EXPORT_IMPORTS_",
  }
);

export const ImportExportTypes = Types;
export const ImportExportActions = Creators;

export interface ImportExportState {
  data: ImportExportData[] | null;
  pagination?: CamelPagination;
  loading: boolean;
  error: string | null;
  progress?: any | null;
}
export interface ImportExportRequestAction {
  query?: ImportExportQuery;
  error: string | null;
  onSuccess?: (data: ImportExportData) => void;
  onFailure?: () => void;
  onLoad?: (progress?: string | number) => void;
}

interface SuccessAction {
  data: ImportExportData[];
  pagination: CamelPagination;
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: ImportExportState = {
  data: null,
  loading: false,
  error: null,
  progress: 0,
};

const _request = (state: ImportExportState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ImportExportState, action: SuccessAction) => {
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

const _failure = (state: ImportExportState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
    progress: { $set: 0 },
  });

const _reset = () => INITIAL_STATE;

export const importExport = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.LOAD]: _load,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});