import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, IFailureAction } from "interfaces/create-duck";

const { Types, Creators } = createActions(
  {
    request: ["postData", "onSuccess", "onFailure"],
    success: [],
    failure: ["error"],
    reset: [],
  },
  { prefix: "CREATE_COMPANY_CARRIER_" }
);

export interface CreateCompanyCarrierState extends IState {}

const INITIAL_STATE: CreateCompanyCarrierState = {
  loading: false,
  error: null,
};

const request = (state: CreateCompanyCarrierState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: CreateCompanyCarrierState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: CreateCompanyCarrierState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const createCompanyCarrier = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const CreateCompanyCarrierTypes = Types;
export const CreateCompanyCarrierActions = Creators;