import { CamelPagination } from 'contracts';
import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IstorageLocationIndexData, IstorageLocationIndexQuery } from 'contracts/management/StorageLocation';

const { Types, Creators } = createActions(
  {
    // request: ["query", "onSuccess", "onFailure"],
    request: ["onSuccess", "onFailure"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "INDEX_STORAGE_LOCATION_",
  }
);

export const StorageLocationIndexTypes = Types;
export const StorageLocationIndexActions = Creators;

export interface StorageLocationIndexState {
  data: IstorageLocationIndexData[] | null;
  pagination?: CamelPagination;
  loading: boolean;
  error: string | null;
}
export interface StorageLocationIndexRequestAction {
  // query?: IstorageLocationIndexQuery;
  error: string | null;
  onSuccess?: (data: IstorageLocationIndexData) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: IstorageLocationIndexData[];
  // pagination: CamelPagination;
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: StorageLocationIndexState = {
  data: null,
  // pagination: undefined,
  loading: false,
  error: null,
};

const _request = (state: StorageLocationIndexState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: StorageLocationIndexState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    // pagination: { $set: action.pagination },
  });
};

const _failure = (state: StorageLocationIndexState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const storageLocationIndex = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
