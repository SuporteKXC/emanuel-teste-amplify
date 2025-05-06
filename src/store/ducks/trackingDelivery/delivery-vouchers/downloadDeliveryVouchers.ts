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
    prefix: "DOWNLOAD_DELIVERY_VOUCHER_",
  }
);

export const DeliveryVoucherDownloadTypes = Types;
export const DeliveryVoucherDownloadActions = Creators;

export interface DeliveryVoucherDownloadState {
  data: string | null;
  loading: boolean;
  error: string | null;
}

export interface DeliveryVoucherDownloadRequestAction {
  query?: any;
  error: string | null;
  callBack: {
    onSuccess?: (data: string) => void;
    onFailure?: () => void;
  };
}

interface SuccessAction {
  data: string;
  loading: boolean;
}

interface FailureAction {
  error: string;
  loading: boolean;
}

const INITIAL_STATE: DeliveryVoucherDownloadState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: DeliveryVoucherDownloadState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (
  state: DeliveryVoucherDownloadState,
  action: SuccessAction
) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
};

const _failure = (state: DeliveryVoucherDownloadState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const deliveryVoucherDownload = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
