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
  { prefix: "CREATE_BUSINESS_" }
);

export interface CreateBusinessState extends IState {}

const INITIAL_STATE: CreateBusinessState = {
  loading: false,
  error: null,
};

const request = (state: CreateBusinessState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: CreateBusinessState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: CreateBusinessState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const createBusiness = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const CreateBusinessTypes = Types;
export const CreateBusinessActions = Creators;
