import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { Pagination } from "contracts";
import type { ProductData } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'COMEX_PRODUCTS_LIST',
    }
  );

export const ProductsListTypes = Types;
export const ProductsActions = Creators;

export interface ProductsState {
  data: ProductData[] | null;
  meta: Pagination | any;
  loading: boolean;
  error: string | null;
}
  
export interface ProductsRequestAction {
  params: any;
  error: string | null;
  onSuccess?: (data: ProductData[]) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ProductData[] | any;
  meta: Pagination;
  loading:boolean
}

interface FailureAction {
  error: string;
  loading:boolean;
}

const INITIAL_STATE: ProductsState = {
  data: null,
  meta: [],
  loading: false,
  error: null,
};

const _request = (state: ProductsState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ProductsState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data.data },
    meta: { $set: action.data.meta },
    // meta: { $set: action.meta },
  });

const _failure = (state: ProductsState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const productsList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});