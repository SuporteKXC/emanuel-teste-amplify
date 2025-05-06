import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { VehicleTypes } from 'contracts/VehicleTypes';

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'FETCH_VEHICLE_TYPE_',
  }
);

export interface FetchVehicleTypeState {
  data: VehicleTypes | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface FetchVehicleTypeRequestAction {
  id: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: VehicleTypes;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: FetchVehicleTypeState = {
  data: null,
  loading: false,
  errorMessage: null,
};

const request = (state: FetchVehicleTypeState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: FetchVehicleTypeState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: FetchVehicleTypeState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: FetchVehicleTypeState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const fetchVehicleType = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const FetchVehicleTypeTypes = Types;
export const FetchVehicleTypeActions = Creators;
