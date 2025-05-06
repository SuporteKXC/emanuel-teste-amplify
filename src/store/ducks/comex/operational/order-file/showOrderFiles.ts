import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { OrderFile } from "@/contracts/comex/OrderFile";

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'SHOW_ORDER_FILES_',
  }
);

export const ShowOrderFilesTypes = Types;
export const ShowOrderFilesActions = Creators;

export interface ShowOrderFilesState {
  data: OrderFile | null;
  loading: boolean;
  error: string | null;
}

export interface ShowOrderFilesRequestAction {
  data: OrderFile;
  error: string | null;
  onSuccess?: (data: OrderFile) => void;
  onFailure?: () => void;
  id: string | number;
}

interface SuccessAction {
  data: OrderFile;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: ShowOrderFilesState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: ShowOrderFilesState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ShowOrderFilesState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const _failure = (state: ShowOrderFilesState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.errorMessage },
  });

const _reset = () => INITIAL_STATE;

export const showOrderFiles = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
