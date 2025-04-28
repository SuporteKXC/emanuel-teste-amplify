import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { IProduct } from "interfaces/product";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_PRODUCTS_" }
);

export interface ListProductsState extends IState {
  data: IProduct[];
}

interface ISuccessListProductsAction extends ISuccessAction {
  data: IProduct[];
}

const INITIAL_STATE: ListProductsState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListProductsState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListProductsState, action: ISuccessListProductsAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListProductsState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listProducts = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListProductsTypes = Types;
export const ListProductsActions = Creators;
