import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { DeliveryVoucher } from "contracts/trackingDelivery";

const { Types, Creators } = createActions(
  {
    request: ["query", "callBack"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "REJECT_DELIVERY_VOUCHER_",
  }
);

export const DeliveryVoucherRejectTypes = Types;
export const DeliveryVoucherRejectActions = Creators;

export interface DeliveryVoucherRejectState {
  loading: boolean;
  error: string | null;
}

export interface DeliveryVoucherRejectRequestAction {
  query: {
    id: number;
    reason?: string;
  };
  error: string | null;
  callBack: {
    onSuccess?: (data: string) => void;
    onFailure?: () => void;
  };
}

interface SuccessAction {
  loading: boolean;
}

interface FailureAction {
  error: string;
  loading: boolean;
}

const INITIAL_STATE: DeliveryVoucherRejectState = {
  loading: false,
  error: null,
};

const _request = (state: DeliveryVoucherRejectState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: DeliveryVoucherRejectState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
  });
};

const _failure = (state: DeliveryVoucherRejectState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const deliveryVoucherReject = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
