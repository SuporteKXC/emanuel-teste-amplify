import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { VehicleTypes } from 'contracts/VehicleTypes';

const { Types, Creators } = createActions(
  {
    request: ['query', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'LIST_VEHICLE_TYPES_',
  }
);

export interface ListVehicleTypesState {
  data: VehicleTypes[];
  loading: boolean;
  errorMessage: string | null;
}

export interface ListVehicleTypesRequestAction {
  query?: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: VehicleTypes[];
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: ListVehicleTypesState = {
  data: [],
  loading: false,
  errorMessage: null,
};

const request = (state: ListVehicleTypesState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: ListVehicleTypesState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: ListVehicleTypesState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: ListVehicleTypesState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const listVehicleTypes = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const ListVehicleTypesTypes = Types;
export const ListVehicleTypesActions = Creators;
