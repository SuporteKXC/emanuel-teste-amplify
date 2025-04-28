import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { Vehicle, VehicleOption } from "interfaces/vehicle";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_VEHICLES_" }
);

export interface ListVehiclesState extends IState {
  data: VehicleOption[];
}

interface ISuccessListUnitsAction extends ISuccessAction {
  data: Vehicle[];
}

const INITIAL_STATE: ListVehiclesState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListVehiclesState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListVehiclesState, action: ISuccessListUnitsAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListVehiclesState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listVehicles = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListVehiclesTypes = Types;
export const ListVehiclesActions = Creators;
