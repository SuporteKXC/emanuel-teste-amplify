import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { ProductResponsibleData } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['id','onSuccess','onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'COMEX_PRODUCT_FETCH_',
  }
);

export const FetchProductTypes = Types;
export const FetchProductActions = Creators;

interface IProductData {
  id: number,
  description: string,
  code: string,
  consignee: string,
  origem: string | null;
  bu: string | null
  business_unit: string | null
  alert_critical: number
  deadline_days: number
  product_responsible: ProductResponsibleData[];
}

export interface FetchProductState {
  data: IProductData | null;
  loading: boolean;
  error: string | null;
}

export interface FetchProductRequestAction {
  id: number;
  error: string | null;
  onSuccess?: (data: IProductData) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: IProductData;
}

interface FailureAction {
  error: string;
}

const INITIAL_STATE: FetchProductState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state:FetchProductState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: FetchProductState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: FetchProductState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const productFetch = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });