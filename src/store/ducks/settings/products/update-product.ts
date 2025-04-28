import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/update-duck";

const { Types, Creators } = createActions(
  {
    request: ["id", "putData", "onSuccess", "onFailure"],
    success: [],
    failure: ["error"],
    reset: [],
  },
  { prefix: "UPDATE_PRODUCT_" }
);

export interface UpdateProductState extends IState {}

const INITIAL_STATE: UpdateProductState = {
  loading: false,
  error: null,
};

const request = (state: UpdateProductState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: UpdateProductState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateProductState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const updateProduct = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateProductTypes = Types;
export const UpdateProductActions = Creators;
