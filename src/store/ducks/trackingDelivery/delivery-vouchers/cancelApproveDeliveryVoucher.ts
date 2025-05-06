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
    prefix: "CANCEL_APPROVE_DELIVERY_VOUCHER_",
  }
);

export const DeliveryVoucherCancelApproveTypes = Types;
export const DeliveryVoucherCancelApproveActions = Creators;

export interface DeliveryVoucherCancelApproveState {
  loading: boolean;
  error: string | null;
}

export interface DeliveryVoucherCancelApproveRequestAction {
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

const INITIAL_STATE: DeliveryVoucherCancelApproveState = {
  loading: false,
  error: null,
};

const _request = (state: DeliveryVoucherCancelApproveState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (
  state: DeliveryVoucherCancelApproveState,
  action: SuccessAction
) => {
  return update(state, {
    loading: { $set: false },
  });
};

const _failure = (
  state: DeliveryVoucherCancelApproveState,
  action: FailureAction
) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const deliveryVoucherCancelApprove = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
