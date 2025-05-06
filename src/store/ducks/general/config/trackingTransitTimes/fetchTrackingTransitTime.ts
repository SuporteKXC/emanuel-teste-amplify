import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { TrackingTransitTime } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["errorMessage"],
    softReset: [],
    reset: [],
  },
  {
    prefix: "FETCH_TRACKING_TRANSIT_TIME_",
  }
);

export interface FetchTrackingTransitTimeState {
  data: TrackingTransitTime | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface FetchTrackingTransitTimeRequestAction {
  id: number;
  onSuccess?: (data: TrackingTransitTime) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: TrackingTransitTime;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: FetchTrackingTransitTimeState = {
  data: null,
  loading: false,
  errorMessage: null,
};

const request = (state: FetchTrackingTransitTimeState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: FetchTrackingTransitTimeState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: FetchTrackingTransitTimeState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: FetchTrackingTransitTimeState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = (state: FetchTrackingTransitTimeState) =>
  update(state, {
    loading: { $set: false },
    data: { $set: null },
  });

export const fetchTrackingTransitTime = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const FetchTrackingTransitTimeTypes = Types;
export const FetchTrackingTransitTimeActions = Creators;
