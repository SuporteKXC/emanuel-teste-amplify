import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { SortingParams } from "contracts";

const { Types, Creators } = createActions(
    {
      setFilterData: ['data'],
      reset: [],
    },
    {
      prefix: 'COMEX_ORDERS_FILTER_',
    }
  );

export interface IOrderFilter extends SortingParams {
  limit: number | undefined,
  page: number,
  company: Array<string> | null;
  statusProcess: Array<string> | null;
  product: string | null;
  responsible: string | null;
  grActualStart: string | null;
  grActualEnd: string | null;
  urgent: string | null; 
}

export const OrderFilterTypes = Types;
export const OrderFilterActions = Creators;

interface OrderFilterState {
  data: IOrderFilter;
}

interface SetFilterData {
  data: IOrderFilter;
}

const INITIAL_STATE: OrderFilterState = {
  data: {
    limit: 10,
    page: 1,
    company: null,
    statusProcess: null,
    product: null,
    responsible: null,
    grActualStart: null,
    grActualEnd: null,
    urgent: null,
  }
};

const setFilterData = (state: OrderFilterState, action: SetFilterData) =>
  update(state, {
    data: { $set: action.data },
});

const reset = () => INITIAL_STATE;

export const ordersFilter = createReducer(INITIAL_STATE, {
    [Types.SET_FILTER_DATA]: setFilterData,
    [Types.RESET]: reset,
});