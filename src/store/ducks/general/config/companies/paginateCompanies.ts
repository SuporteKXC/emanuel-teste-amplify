import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { CamelPagination, Pagination } from "contracts";
import Company from "@/contracts/general/Company";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    success: ["data", "pagination"],
    failure: ["errorMessage"],
    softReset: [],
    reset: [],
  },
  {
    prefix: "PAGINATE_COMPANIES_",
  }
);

export interface PaginateCompaniesState {
  data: Company[];
  pagination?: CamelPagination;
  loading: boolean;
  errorMessage: string | null;
}

export interface PaginateCompaniesRequestAction {
  query?: Record<string, any>;
  onSuccess?: (data: Company[]) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: Company[];
  pagination: CamelPagination;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: PaginateCompaniesState = {
  data: [],
  loading: false,
  errorMessage: null,
};

const request = (state: PaginateCompaniesState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: PaginateCompaniesState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    pagination: { $set: action.pagination },
  });

const failure = (state: PaginateCompaniesState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: PaginateCompaniesState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const paginateCompanies = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const PaginateCompaniesTypes = Types;
export const PaginateCompaniesActions = Creators;
