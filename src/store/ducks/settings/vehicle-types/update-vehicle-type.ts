import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/update-duck";

const { Types, Creators } = createActions(
  {
    request: ["id", "putData", "onSuccess", "onFailure"],
    success: [],
    failure: ["error"],
    reset: [],
  },
  { prefix: "UPDATE_VEHICLE_TYPE_" }
);

export interface UpdateVehicleTypeState extends IState {}

const INITIAL_STATE: UpdateVehicleTypeState = {
  loading: false,
  error: null,
};

const request = (state: UpdateVehicleTypeState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: UpdateVehicleTypeState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateVehicleTypeState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const updateVehicleType = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateVehicleTypeTypes = Types;
export const UpdateVehicleTypeActions = Creators;
