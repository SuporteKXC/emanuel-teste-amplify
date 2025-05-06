import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { DeliveryVoucher } from "contracts/trackingDelivery";

const { Types, Creators } = createActions(
  {
    request: ["id", "callBack"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "APPROVE_DELIVERY_VOUCHER_",
  }
);

export const DeliveryVoucherApproveTypes = Types;
export const DeliveryVoucherApproveActions = Creators;

export interface DeliveryVoucherApproveState {
  loading: boolean;
  error: string | null;
}

export interface DeliveryVoucherApproveRequestAction {
  id: number;
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

const INITIAL_STATE: DeliveryVoucherApproveState = {
  loading: false,
  error: null,
};

const _request = (state: DeliveryVoucherApproveState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (
  state: DeliveryVoucherApproveState,
  action: SuccessAction
) => {
  return update(state, {
    loading: { $set: false },
  });
};

const _failure = (state: DeliveryVoucherApproveState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const deliveryVoucherApprove = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
