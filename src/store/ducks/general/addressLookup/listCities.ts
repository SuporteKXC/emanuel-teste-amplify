import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { City } from 'contracts';

const { Types, Creators } = createActions(
  {
    request: ['query', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'LIST_CITIES_',
  }
);

export interface ListCitiesState {
  data: City[] | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface ListCitiesRequestAction {
  query?: Record<string, any>;
  onSuccess?: (data: City[]) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: City[];
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: ListCitiesState = {
  data: null,
  loading: false,
  errorMessage: null,
};

const request = (state: ListCitiesState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: ListCitiesState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: ListCitiesState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: ListCitiesState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const listCities = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const ListCitiesTypes = Types;
export const ListCitiesActions = Creators;
