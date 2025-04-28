import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import {
  IState,
  ISuccessAction,
  IFailureAction,
} from "interfaces/paginate-duck";
import { Product } from "interfaces/product";

const { Types, Creators } = createActions(
  {
    request: ["query"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "PAGINATE_PRODUCTS_" }
);

export interface PaginateProductsState extends IState {
  data: Product[] | Record<string, any>[];
}

const INITIAL_STATE: PaginateProductsState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

const request = (state: PaginateProductsState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: PaginateProductsState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    pagination: { $set: action.pagination },
    loading: { $set: false },
  });

const failure = (state: PaginateProductsState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const paginateProducts = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const PaginateProductsTypes = Types;
export const PaginateProductsActions = Creators;
