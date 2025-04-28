import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/delete-duck";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess", "onFailure"],
    success: [],
    failure: ["error"],
    reset: [],
  },
  { prefix: "DELETE_BUSINESS_" }
);

export interface DeleteBusinessState extends IState {}

const INITIAL_STATE: DeleteBusinessState = {
  loading: false,
  error: null,
};

const request = (state: DeleteBusinessState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: DeleteBusinessState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: DeleteBusinessState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const deleteBusiness = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const DeleteBusinessTypes = Types;
export const DeleteBusinessActions = Creators;
