import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/create-duck";

const { Types, Creators } = createActions(
  {
    request: ["postData", "onSuccess", "onFailure"],
    success: [],
    failure: ["error"],
    reset: [],
  },
  { prefix: "CREATE_PRODUCT_EXCEPTION" }
);

export interface CreateProductExceptionState extends IState {}

const INITIAL_STATE: CreateProductExceptionState = {
  loading: false,
  error: null,
};

const request = (state: CreateProductExceptionState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: CreateProductExceptionState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: CreateProductExceptionState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const createProductException = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const CreateProductExceptionTypes = Types;
export const CreateProductExceptionActions = Creators;
