import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { SortingParams } from "contracts";

const { Types, Creators } = createActions(
  {
    setFilterData: ["data"],
    reset: [],
  },
  {
    prefix: "COMEX_DASHBOARD_FILTER_",
  }
);

export interface IOrderItensDelayFilter extends SortingParams {
  country: string | null;
  company: Array<string> | null;
  plantDeliveryStart: string | null;
  plantDeliveryEnd: string | null;
  urgent: string | null;
  modal: string | null;
}

export const OrderItensDelayFilterTypes = Types;
export const OrderItensDelayFilterActions = Creators;

interface OrderItensDelayFilterState {
  data: IOrderItensDelayFilter;
}

interface SetFilterData {
  data: IOrderItensDelayFilter;
}

const INITIAL_STATE: OrderItensDelayFilterState = {
  data: {
    country: null,
    company: null,
    plantDeliveryStart: null,
    plantDeliveryEnd: null,
    urgent: null,
    modal: "MARITIMA",
  },
};

const setFilterData = (
  state: OrderItensDelayFilterState,
  action: SetFilterData
) =>
  update(state, {
    data: { $set: action.data },
  });

const reset = () => INITIAL_STATE;

export const orderItensDelayFilter = createReducer(INITIAL_STATE, {
  [Types.SET_FILTER_DATA]: setFilterData,
  [Types.RESET]: reset,
});
