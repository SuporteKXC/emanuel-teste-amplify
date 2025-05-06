import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { Pagination } from "contracts";
import type { ProductData } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['params', 'onSuccess', 'onFailure'],
    success: ['data', 'meta'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'COMEX_PRODUCTS_PAGINATE_',
  }
);

export const ProductPaginateTypes = Types;
export const ProductPaginateActions = Creators;

export interface ProductPaginateState {
  data: ProductData[] | null;
  meta: Pagination | any;
  loading: boolean;
  error: string | null;
}

export interface ProductPaginateRequestAction {
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

const INITIAL_STATE: ProductPaginateState = {
  data: null,
  meta:[],
  loading: false,
  error: null,
};

const _request = (state: ProductPaginateState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ProductPaginateState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data.data },
    meta: { $set:action.data.meta},
  });

const _failure = (state: ProductPaginateState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const productPaginate = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
