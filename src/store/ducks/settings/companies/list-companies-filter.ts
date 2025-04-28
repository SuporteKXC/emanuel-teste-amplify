import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { Company } from "interfaces/company";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_COMPANIES_FILTER_" }
);

export interface ListCompaniesFilterState extends IState {
  data: Company[];
}

interface ISuccessListUnitsAction extends ISuccessAction {
  data: Company[];
}

const INITIAL_STATE: ListCompaniesFilterState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListCompaniesFilterState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListCompaniesFilterState, action: ISuccessListUnitsAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListCompaniesFilterState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listCompaniesFilter = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListCompaniesFilterTypes = Types;
export const ListCompaniesFilterActions = Creators;
