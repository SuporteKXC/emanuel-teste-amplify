import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { TrackingTransitTime } from 'contracts/general/TrackingTransitTime';
import type { CamelPagination } from 'contracts';

const { Types, Creators } = createActions(
  {
    request: ['query', 'onSuccess', 'onFailure'],
    success: ['data', 'pagination'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'PAGINATE_TRACKING_TRANSIT_TIMES_',
  }
);

export interface PaginateTrackingTransitTimesState {
  data: TrackingTransitTime[];
  pagination?: CamelPagination;
  loading: boolean;
  errorMessage: string | null;
}

export interface PaginateTrackingTransitTimesRequestAction {
  query?: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: TrackingTransitTime[];
  pagination: CamelPagination;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: PaginateTrackingTransitTimesState = {
  data: [],
  loading: false,
  errorMessage: null,
};

const request = (state: PaginateTrackingTransitTimesState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: PaginateTrackingTransitTimesState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    pagination: { $set: action.pagination },
  });

const failure = (state: PaginateTrackingTransitTimesState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: PaginateTrackingTransitTimesState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const paginateTrackingTransitTimes = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const PaginateTrackingTransitTimesTypes = Types;
export const PaginateTrackingTransitTimesActions = Creators;
