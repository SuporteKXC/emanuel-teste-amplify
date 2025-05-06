import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["errorMessage"],
    softReset: [],
    reset: [],
  },
  {
    prefix: "FETCH_ACCOUNTS_",
  }
);

export interface FetchAccountsState {
  data: any | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface FetchAccountsRequestAction {
  id: number;
  onSuccess?: (data: any) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: any;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: FetchAccountsState = {
  data: null,
  loading: false,
  errorMessage: null,
};

const request = (state: FetchAccountsState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: FetchAccountsState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: FetchAccountsState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: FetchAccountsState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = (state: FetchAccountsState) =>
  update(state, {
    loading: { $set: false },
    data: { $set: null },
  });

export const fetchAccounts = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const FetchAccountsTypes = Types;
export const FetchAccountsActions = Creators;
