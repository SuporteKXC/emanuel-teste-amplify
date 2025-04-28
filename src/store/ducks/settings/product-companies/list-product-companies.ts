import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { IProductCompany } from "interfaces/product-companies";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_PRODUCT_COMPANIES" }
);

export interface ListProductCompaniesState extends IState {
  data: IProductCompany[];
}

interface ISuccessListProductCompaniesAction extends ISuccessAction {
  data: IProductCompany[];
}

const INITIAL_STATE: ListProductCompaniesState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListProductCompaniesState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListProductCompaniesState, action: ISuccessListProductCompaniesAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListProductCompaniesState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listProductCompanies = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListProductCompaniesTypes = Types;
export const ListProductCompaniesActions = Creators;
