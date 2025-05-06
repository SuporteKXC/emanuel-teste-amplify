import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { ICreditHistory } from "contracts";
import { Pagination } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data', 'meta'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'COMEX_CREDIT_HISTORY_',
    }
  );

export const CreditHistoryListTypes = Types;
export const CreditHistoryActions = Creators;

export interface CreditHistoryState {
    data: ICreditHistory[] | null;
    meta: Pagination | any;
    loading: boolean;
    error: string | null;
  }
export interface CreditHistoryRequestAction {
    params: any;
    error: string | null;
    onSuccess?: (data: ICreditHistory) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
    data: {
      meta: Pagination;
      data: ICreditHistory[];
    } 
    loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: CreditHistoryState = {
  data: null,
  meta: [],
  loading: false,
  error: null,
};

const _request = (state: CreditHistoryState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: CreditHistoryState, action:SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data.data },
    meta: { $set: action.data.meta },
  });

const _failure = (state: CreditHistoryState, action:FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const creditHistories = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});