import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { DeliveryVoucher } from "contracts/trackingDelivery";
import { CheckboxOptions } from "@/components/ui/DataFilter";
import { checkeboxOptions } from "@/data/DeliveryVoucher/data";

export type DeliveryVoucherFilter = {
  documentNumber: string;
  emissionDateStart: string | undefined;
  emissionDateEnd: string | undefined;
  deliveryDateStart: string | undefined;
  deliveryDateEnd: string | undefined;
  carrierId: string;
  clientId: string;
  originCity: string;
  destinationCity: string;
};

const { Types, Creators } = createActions(
  {
    request: ["query", "statusFilter", "onSuccess", "onFailure"],
    setStatusFilter: ["statusFilter"],
    setFilters: ["filter"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "LIST_DELIVERY_VOUCHERS_",
  }
);

export const DeliveryVouchersListTypes = Types;
export const DeliveryVouchersListActions = Creators;

export interface DeliveryVouchersListState {
  data: DeliveryVoucher[];
  statusFilter: CheckboxOptions[];
  filters: DeliveryVoucherFilter;
  loading: boolean;
  error: string | null;
}

export interface DeliveryVouchersListRequestAction {
  query?: any;
  error: string | null;
  onSuccess?: (data: DeliveryVoucher[]) => void;
  onFailure?: () => void;
}

interface SetStatusFilterAction {
  statusFilter: CheckboxOptions[];
}

interface SetFilterAction {
  filter: DeliveryVoucherFilter;
}

interface SuccessAction {
  data: DeliveryVoucher[];
  loading: boolean;
}

interface FailureAction {
  error: string;
  loading: boolean;
}

const INITIAL_STATE: DeliveryVouchersListState = {
  data: [],
  statusFilter: checkeboxOptions,
  filters: {
    documentNumber: "",
    emissionDateStart: undefined,
    emissionDateEnd: undefined,
    deliveryDateStart: undefined,
    deliveryDateEnd: undefined,
    carrierId: "",
    clientId: "",
    originCity: "",
    destinationCity: "",
  },
  loading: false,
  error: null,
};

const _request = (state: DeliveryVouchersListState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _setStatusFilter = (
  state: DeliveryVouchersListState,
  action: SetStatusFilterAction
) => {
  return update(state, {
    statusFilter: { $set: action.statusFilter },
  });
};

const _setFilters = (
  state: DeliveryVouchersListState,
  action: SetFilterAction
) => {
  const { filter } = action;
  const updatedState = update(state, {
    filters: { $set: filter },
  });

  return updatedState;
};

const _success = (state: DeliveryVouchersListState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
};

const _failure = (state: DeliveryVouchersListState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const deliveryVoucherList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
  [Types.SET_STATUS_FILTER]: _setStatusFilter,
  [Types.SET_FILTERS]: _setFilters,
});
