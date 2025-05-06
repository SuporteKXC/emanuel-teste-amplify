import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { CompanyData } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'COMEX_COMPANY_',
    }
  );

export const CompanyListTypes = Types;
export const CompanyActions = Creators;

export interface CompanyState {
    data: CompanyData[] | null;
    loading: boolean;
    error: string | null;
  }
export interface CompanyRequestAction {
    data: { id:number; name: string };
    error: string | null;
    onSuccess?: (data:CompanyData) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
    data: CompanyData[];
    loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE:CompanyState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state:CompanyState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state:CompanyState, action:SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state:CompanyState, action:FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const company = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });