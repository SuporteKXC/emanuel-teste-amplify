import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import {
  IState,
  ISuccessAction,
  IFailureAction,
} from "interfaces/paginate-duck";
import { VehicleType } from "interfaces/vehicle-type";

const { Types, Creators } = createActions(
  {
    request: ["query"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "PAGINATE_VEHICLE_TYPES_" }
);

export interface PaginateVehicleTypesState extends IState {
  data: VehicleType[] | Record<string, any>[];
}

const INITIAL_STATE: PaginateVehicleTypesState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

const request = (state: PaginateVehicleTypesState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: PaginateVehicleTypesState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    pagination: { $set: action.pagination },
    loading: { $set: false },
  });

const failure = (state: PaginateVehicleTypesState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const paginateVehicleTypes = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const PaginateVehicleTypesTypes = Types;
export const PaginateVehicleTypesActions = Creators;
