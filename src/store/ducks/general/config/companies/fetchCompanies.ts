import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import Company from "@/contracts/general/Company";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["errorMessage"],
    softReset: [],
    reset: [],
  },
  {
    prefix: "FETCH_COMPANIES_",
  }
);

export interface FetchCompaniesState {
  data: Company | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface FetchCompaniesRequestAction {
  id: number;
  onSuccess?: (data: Company) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: Company;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: FetchCompaniesState = {
  data: null,
  loading: false,
  errorMessage: null,
};

const request = (state: FetchCompaniesState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: FetchCompaniesState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: FetchCompaniesState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: FetchCompaniesState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = (state: FetchCompaniesState) =>
  update(state, {
    loading: { $set: false },
    data: { $set: null },
  });

export const fetchCompanies = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const FetchCompaniesTypes = Types;
export const FetchCompaniesActions = Creators;
