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
  { prefix: "UPDATE_PRODUCT_TYPE" }
);

export interface UpdateProductTypeState extends IState {}

const INITIAL_STATE: UpdateProductTypeState = {
  loading: false,
  error: null,
};

const request = (state: UpdateProductTypeState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: UpdateProductTypeState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateProductTypeState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const updateProductType = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateProductTypeTypes = Types;
export const UpdateProductTypeActions = Creators;
