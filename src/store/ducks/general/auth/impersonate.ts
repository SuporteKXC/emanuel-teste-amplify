import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

const { Types, Creators } = createActions(
  {
    request: ["postData", "onSuccess", "onFailure", "navigation"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "IMPERSONATE_" }
);

export interface ImpersonateState {
  loading: boolean;
  errorMessage: string | null;
  validationErrors: any;
}

export interface ImpersonateRequestAction {
  postData: { id: number };
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface ImpersonateFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: ImpersonateState = {
  loading: false,
  errorMessage: null,
  validationErrors: [],
};

const request = (state: ImpersonateState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
    validationErrors: { $set: [] },
  });

const success = (state: ImpersonateState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: ImpersonateState, action: ImpersonateFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
    validationErrors: { $set: action.validationErrors || [] },
  });

const reset = () => INITIAL_STATE;

export const impersonate = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ImpersonateTypes = Types;
export const ImpersonateActions = Creators;
