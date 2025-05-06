import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { ITransitTime } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ["postData", "onSuccess", "onFailure"],
    success: [],
    failure: ["errorMessage"],
    reset: [],
  },
  {
    prefix: "COMEX_NEW_TRANSIT_TIME",
  }
);

export interface NewTransitTimeState {
  loading: boolean;
  errorMessage: string | null;
}

export interface NewTransitTimeRequestAction {
  postData: ITransitTime;
  onSuccess?: (id: string) => void;
  onFailure?: () => void;
}

interface NewTransitTimeFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: NewTransitTimeState = {
  loading: false,
  errorMessage: null,
};

const request = (state: NewTransitTimeState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: NewTransitTimeState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (
  state: NewTransitTimeState,
  action: NewTransitTimeFailureAction
) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const newTrasitTime = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const NewTransitTimeTypes = Types;
export const NewTransitTimeActions = Creators;
