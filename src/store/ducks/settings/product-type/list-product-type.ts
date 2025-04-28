import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { IProductType } from "interfaces/product-type";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_PRODUCT_TYPE" }
);

export interface ListProductTypeState extends IState {
  data: IProductType[];
}

interface ISuccessListProductTypeAction extends ISuccessAction {
  data: IProductType[];
}

const INITIAL_STATE: ListProductTypeState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListProductTypeState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListProductTypeState, action: ISuccessListProductTypeAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListProductTypeState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listProductType = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListProductTypeTypes = Types;
export const ListProductTypeActions = Creators;
