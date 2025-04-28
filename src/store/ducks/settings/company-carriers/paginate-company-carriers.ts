import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import {
  IState,
  ISuccessAction,
  IFailureAction,
} from "interfaces/paginate-duck";
import { CompanyCarrier } from "interfaces/company-carriers";

const { Types, Creators } = createActions(
  {
    request: ["query"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "PAGINATE_COMPANY_CARRIES_" }
);

export interface PaginateCompanyCarriersState extends IState {
  data: CompanyCarrier[];
}

const INITIAL_STATE: PaginateCompanyCarriersState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

const request = (state: PaginateCompanyCarriersState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: PaginateCompanyCarriersState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data as CompanyCarrier[] },
    pagination: { $set: action.pagination },
    loading: { $set: false },
  });

const failure = (state: PaginateCompanyCarriersState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const paginateCompanyCarriers = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const PaginateCompanyCarriersTypes = Types;
export const PaginateCompanyCarriersActions = Creators;
