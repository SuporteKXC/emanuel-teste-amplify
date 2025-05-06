import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { ITransitTime } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ["params", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "COMEX_TRANSIT_TIME_",
  }
);

export const ListTransitTimeTypes = Types;
export const ListTransitTimeActions = Creators;

export interface ListTransitTimeState {
  data: ITransitTime[] | null;
  loading: boolean;
  error: string | null;
}
export interface TransitTimeRequestAction {
  data: ITransitTime[];
  error: string | null;
  onSuccess?: (data: ITransitTime) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ITransitTime[];
}
interface FailureAction {
  error: string;
}
const INITIAL_STATE: ListTransitTimeState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: ListTransitTimeState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ListTransitTimeState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const _failure = (state: ListTransitTimeState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const transitTime = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
