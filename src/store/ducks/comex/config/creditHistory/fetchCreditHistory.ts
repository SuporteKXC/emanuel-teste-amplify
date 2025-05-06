import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { ICreditHistory } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "COMEX_CREDIT_HISTORY_FETCH_",
  }
);

export const FetchCreditHistoryTypes = Types;
export const FetchCreditHistoryActions = Creators;

interface ICreditHistoryData extends ICreditHistory {}

export interface FetchCreditHistoryState {
  data: ICreditHistoryData | undefined;
  loading: boolean;
  error: string | null;
}

export interface FetchCreditHistoryRequestAction {
  id: number;
  error: string | null;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ICreditHistoryData;
}

interface FailureAction {
  error: string;
}

const INITIAL_STATE: FetchCreditHistoryState = {
  data: undefined,
  loading: false,
  error: null,
};

const _request = (state: FetchCreditHistoryState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: FetchCreditHistoryState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const _failure = (state: FetchCreditHistoryState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const creditHistory = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
