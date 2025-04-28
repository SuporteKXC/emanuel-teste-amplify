import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/fetch-duck";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "FETCH_PRODUCT_COMPANY" }
);

export interface FetchProductCompanyState extends IState {}

const INITIAL_STATE: FetchProductCompanyState = {
  data: null,
  loading: false,
  error: null,
};

const request = (state: FetchProductCompanyState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: FetchProductCompanyState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: FetchProductCompanyState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const fetchProductCompany = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const FetchProductCompanyTypes = Types;
export const FetchProductCompanyActions = Creators;
