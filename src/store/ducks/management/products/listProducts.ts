import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { Product } from "contracts/management";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "LIST_PRODUCTS_",
  }
);

export const ProductsListTypes = Types;
export const ProductsListActions = Creators;

export interface ProductsListState {
  data: Product[] | null;
  loading: boolean;
  error: string | null;
}
export interface ProductsListRequestAction {
  query?: any;
  error: string | null;
  onSuccess?: (data: Product) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: Product[];
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: ProductsListState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: ProductsListState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ProductsListState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
};

const _failure = (state: ProductsListState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const snapshotProductsList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
