import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

export interface FetchRecalculateDeadlineRequestAction {
  putData: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

export interface ISuccessAction {
  data: string | null;
}

export interface IFailureAction {
  error: string;
}

const { Types, Creators } = createActions(
  {
    request: ["putData", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "FETCH_RECALCULATE_DEADLINE_" }
);

export interface FetchRecalculateDeadlineState {
  data: string | null;
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: FetchRecalculateDeadlineState = {
  data: null,
  loading: false,
  error: null,
};

const request = (state: FetchRecalculateDeadlineState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (
  state: FetchRecalculateDeadlineState,
  action: ISuccessAction
) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (
  state: FetchRecalculateDeadlineState,
  action: IFailureAction
) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const fetchRecalculateDeadline = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const FetchRecalculateDeadlineTypes = Types;
export const FetchRecalculateDeadlineActions = Creators;
