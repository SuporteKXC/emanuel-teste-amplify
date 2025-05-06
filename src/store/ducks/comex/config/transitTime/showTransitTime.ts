import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { ITransitTime } from "contracts";
const { Types, Creators } = createActions(
  {
    request: ['id','onSuccess','onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'COMEX_SHOW_TRANSIT_TIME',
  }
);

export const ShowTransitTimeTypes = Types;
export const ShowTransitTimeActions = Creators;



export interface ShowTransitTimeState {
  data: ITransitTime | null;
  loading: boolean;
  error: string | null;
}

export interface ShowTransitTimeRequestAction {
  id: number;
  error: string | null;
  onSuccess?: (data: ITransitTime) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ITransitTime;
}

interface FailureAction {
  error: string;
}

const INITIAL_STATE: ShowTransitTimeState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state:ShowTransitTimeState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ShowTransitTimeState, action: SuccessAction) =>
  update(state, {
  loading: { $set: false },
  data: { $set: action.data }
});

const _failure = (state: ShowTransitTimeState, action: FailureAction) =>
  update(state, {
  loading: { $set: false },
  error: { $set: action.error },
});

const _reset = () => INITIAL_STATE;

export const showTransitTime = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});