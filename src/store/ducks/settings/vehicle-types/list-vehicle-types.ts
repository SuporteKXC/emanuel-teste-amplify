import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { VehicleTypeOption } from "interfaces/vehicle-type";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_VEHICLE_TYPES_" }
);

export interface ListVehicleTypesState extends IState {
  data: VehicleTypeOption[];
}

interface ISuccessListUnitsAction extends ISuccessAction {
  data: VehicleTypeOption[];
}

const INITIAL_STATE: ListVehicleTypesState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListVehicleTypesState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (
  state: ListVehicleTypesState,
  action: ISuccessListUnitsAction
) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListVehicleTypesState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listVehicleTypes = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListVehicleTypesTypes = Types;
export const ListVehicleTypesActions = Creators;
