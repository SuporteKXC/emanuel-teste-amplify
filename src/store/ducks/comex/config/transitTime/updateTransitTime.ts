import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { ITransitTime } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ["id", "postData", "onSuccess", "onFailure"],
    success: [],
    failure: ["errorMessage"],
    reset: [],
  },
  {
    prefix: "COMEX_UPDATE_TRANSIT_TIME_",
  }
);

export interface UpdateTransitTimeState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UpdateTransitTimeRequestAction {
  id: number;
  postData: ITransitTime;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface UpdateTransitTimeFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UpdateTransitTimeState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UpdateTransitTimeState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: UpdateTransitTimeState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (
  state: UpdateTransitTimeState,
  action: UpdateTransitTimeFailureAction
) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const updateTransitTime = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateTransitTimeTypes = Types;
export const UpdateTransitTimeActions = Creators;
