import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { EndProcessData, EndProcessQuery } from "contracts/management";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "END_PROCESS_TRANSFERS_",
  }
);

export const TransferEndProcessTypes = Types;
export const TransferEndProcessActions = Creators;

export interface TransferEndProcessState {
  data: EndProcessData[];
  loading: boolean;
  error: string | null;
}
export interface TransferEndProcessRequestAction {
  query?: EndProcessQuery;
  error: string | null;
  onSuccess?: (data: EndProcessQuery) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: EndProcessData[];
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: TransferEndProcessState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state: TransferEndProcessState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: TransferEndProcessState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
};

const _failure = (state: TransferEndProcessState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const transferEndProcess = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
