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
  { prefix: "UPDATE_BUSINESS_" }
);

export interface UpdateBusinessState extends IState {}

const INITIAL_STATE: UpdateBusinessState = {
  loading: false,
  error: null,
};

const request = (state: UpdateBusinessState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: UpdateBusinessState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateBusinessState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const updateBusiness = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateBusinessTypes = Types;
export const UpdateBusinessActions = Creators;
