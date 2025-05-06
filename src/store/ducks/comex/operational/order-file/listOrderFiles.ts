import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { OrderFile } from "@/contracts/comex/OrderFile";

const { Types, Creators } = createActions(
  {
    request: ['params', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'LIST_ORDER_FILES_',
  }
);

export const ListOrderFilesTypes = Types;
export const ListOrderFilesActions = Creators;

export interface ListOrderFilesState {
  data: OrderFile[] | null;
  loading: boolean;
  error: string | null;
}

export interface ListOrderFilesRequestAction {
  data: OrderFile[];
  error: string | null;
  onSuccess?: (data: OrderFile[]) => void;
  onFailure?: () => void;
  params: any;
}

interface SuccessAction {
  data: OrderFile[];
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: ListOrderFilesState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: ListOrderFilesState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ListOrderFilesState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const _failure = (state: ListOrderFilesState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.errorMessage },
  });

const _reset = () => INITIAL_STATE;

export const listOrderFiles = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
