import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/create-duck";

const { Types, Creators } = createActions(
  {
    request: ["postData", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "FORGOT_" }
);

export interface ForgotState extends IState {}

const INITIAL_STATE: ForgotState = {
  data: {},
  loading: false,
  error: null,
};

const request = (state: ForgotState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ForgotState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: ForgotState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const forgot = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ForgotTypes = Types;
export const ForgotActions = Creators;
