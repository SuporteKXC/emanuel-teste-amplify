import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { Client } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["errorMessage"],
    softReset: [],
    reset: [],
  },
  {
    prefix: "FETCH_CLIENT_",
  }
);

export interface FetchClientState {
  data: Client | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface FetchClientRequestAction {
  id: number;
  onSuccess?: (data: Client) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: Client;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: FetchClientState = {
  data: null,
  loading: false,
  errorMessage: null,
};

const request = (state: FetchClientState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: FetchClientState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: FetchClientState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: FetchClientState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = (state: FetchClientState) =>
  update(state, {
    loading: { $set: false },
    data: { $set: null },
  });

export const fetchClient = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const FetchClientTypes = Types;
export const FetchClientActions = Creators;
