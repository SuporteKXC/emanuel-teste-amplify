import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { IProductException } from "interfaces/product-exception";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_PRODUCT_EXCEPTION" }
);

export interface ListProductExceptionState extends IState {
  data: IProductException[];
}

interface ISuccessListProductExceptionAction extends ISuccessAction {
  data: IProductException[];
}

const INITIAL_STATE: ListProductExceptionState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListProductExceptionState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListProductExceptionState, action: ISuccessListProductExceptionAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListProductExceptionState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listProductException = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListProductExceptionTypes = Types;
export const ListProductExceptionActions = Creators;
