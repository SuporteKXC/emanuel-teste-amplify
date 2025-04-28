import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, IFailureAction } from "interfaces/delete-duck";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess", "onFailure"],
    success: [],
    failure: ["error"],
    reset: [],
  },
  { prefix: "DELETE_COMPANY_CARRIER_" }
);

export interface DeleteCompanyCarrierState extends IState {}

const INITIAL_STATE: DeleteCompanyCarrierState = {
  loading: false,
  error: null,
};

const request = (state: DeleteCompanyCarrierState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: DeleteCompanyCarrierState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: DeleteCompanyCarrierState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const deleteCompanyCarrier = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const DeleteCompanyCarrierTypes = Types;
export const DeleteCompanyCarrierActions = Creators;