import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { ProductData } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['params', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'COMEX_PRODUCTS_',
  }
);

export const ProductListTypes = Types;
export const ProductActions = Creators;

export interface ProductState {
  data: ProductData[] | null;
  loading: boolean;
  error: string | null;
}

export interface ProductRequestAction {
  data: ProductData[];
  error: string | null;
  onSuccess?: (data: ProductData[]) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ProductData[];
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: ProductState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: ProductState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ProductState, action: ProductRequestAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: ProductState, action: ProductRequestAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const products = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
