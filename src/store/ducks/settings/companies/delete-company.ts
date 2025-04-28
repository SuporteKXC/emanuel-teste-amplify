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
  { prefix: "DELETE_COMPANY_" }
);

export interface DeleteCompanyState extends IState {}

const INITIAL_STATE: DeleteCompanyState = {
  loading: false,
  error: null,
};

const request = (state: DeleteCompanyState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: DeleteCompanyState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: DeleteCompanyState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const deleteCompany = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const DeleteCompanyTypes = Types;
export const DeleteCompanyActions = Creators;
