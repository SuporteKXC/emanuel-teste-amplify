import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { TransferListData, TransfersQuery } from "contracts/management";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "DETAIL_TRANSFER_",
  }
);

export const TransferDetailTypes = Types;
export const TransferDetailActions = Creators;

export interface TransferDetailState {
  data: any;
  loading: boolean;
  error: string | null;
}
export interface TransferDetailRequestAction {
  query?: TransfersQuery;
  error: string | null;
  onSuccess?: (data: TransfersQuery) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: TransferListData;
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: TransferDetailState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: TransferDetailState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: TransferDetailState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
};

const _failure = (state: TransferDetailState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const transferDetail = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
