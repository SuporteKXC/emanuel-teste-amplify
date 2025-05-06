import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { DeliveryVoucher } from "contracts/trackingDelivery";

const { Types, Creators } = createActions(
  {
    request: ["payload", "callBack"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "CREATE_DELIVERY_VOUCHER_",
  }
);

export const DeliveryVoucherCreateTypes = Types;
export const DeliveryVoucherCreateActions = Creators;

export interface DeliveryVoucherCreateState {
  loading: boolean;
  error: string | null;
}

export interface DeliveryVoucherCreateRequestAction {
  payload: any;
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

const INITIAL_STATE: DeliveryVoucherCreateState = {
  loading: false,
  error: null,
};

const _request = (state: DeliveryVoucherCreateState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: DeliveryVoucherCreateState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
  });
};

const _failure = (state: DeliveryVoucherCreateState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const deliveryVoucherCreate = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
