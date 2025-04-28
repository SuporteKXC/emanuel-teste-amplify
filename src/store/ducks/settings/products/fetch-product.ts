import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/fetch-duck";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "FETCH_PRODUCT_" }
);

export interface FetchProductState extends IState {}

const INITIAL_STATE: FetchProductState = {
  data: null,
  loading: false,
  error: null,
};

const request = (state: FetchProductState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: FetchProductState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: FetchProductState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const fetchProduct = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const FetchProductTypes = Types;
export const FetchProductActions = Creators;
