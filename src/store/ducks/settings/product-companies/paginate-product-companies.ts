import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import {
  IState,
  ISuccessAction,
  IFailureAction,
} from "interfaces/paginate-duck";
import { ProductCompany } from "interfaces/product-companies";

const { Types, Creators } = createActions(
  {
    request: ["query"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "PAGINATE_PRODUCT_COMPANIES" }
);

export interface PaginateProductCompaniesState extends IState {
  data: ProductCompany[] | Record<string, any>[];
}

const INITIAL_STATE: PaginateProductCompaniesState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

const request = (state: PaginateProductCompaniesState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: PaginateProductCompaniesState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    pagination: { $set: action.pagination },
    loading: { $set: false },
  });

const failure = (state: PaginateProductCompaniesState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const paginateProductCompanies = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const PaginateProductCompaniesTypes = Types;
export const PaginateProductCompaniesActions = Creators;
