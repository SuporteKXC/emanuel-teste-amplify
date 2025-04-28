import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import {
  IState,
  ISuccessAction,
  IFailureAction,
} from "interfaces/paginate-duck";
import { ProductException } from "interfaces/product-exception";

const { Types, Creators } = createActions(
  {
    request: ["query"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "PAGINATE_PRODUCT_EXCEPTIONS" }
);

export interface PaginateProductExceptionState extends IState {
  data: ProductException[] | Record<string, any>[];
}

const INITIAL_STATE: PaginateProductExceptionState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

const request = (state: PaginateProductExceptionState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: PaginateProductExceptionState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    pagination: { $set: action.pagination },
    loading: { $set: false },
  });

const failure = (state: PaginateProductExceptionState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const paginateProductException = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const PaginateProductExceptionTypes = Types;
export const PaginateProductExceptionActions = Creators;
