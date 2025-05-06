import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type {
  Company
} from "contracts/management";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "LIST_COMPANIES_",
  }
);

export const CompaniesListTypes = Types;
export const CompaniesListActions = Creators;

export interface CompaniesListState {
  data: Company[] | null;
  loading: boolean;
  error: string | null;
}
export interface CompaniesListRequestAction {
  query?: any;
  error: string | null;
  onSuccess?: (data: Company) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: Company[];
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: CompaniesListState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: CompaniesListState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: CompaniesListState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
};

const _failure = (state: CompaniesListState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const companiesList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
