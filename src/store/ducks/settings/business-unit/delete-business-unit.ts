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
  { prefix: "DELETE_BUSINESS_UNIT_" }
);

export interface DeleteBusinessUnitState extends IState {}

const INITIAL_STATE: DeleteBusinessUnitState = {
  loading: false,
  error: null,
};

const request = (state: DeleteBusinessUnitState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: DeleteBusinessUnitState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: DeleteBusinessUnitState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const deleteBusinessUnit = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const DeleteBusinessUnitTypes = Types;
export const DeleteBusinessUnitActions = Creators;
