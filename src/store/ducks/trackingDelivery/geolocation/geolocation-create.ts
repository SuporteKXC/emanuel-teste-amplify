import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

import {
  ISuccessAction,
  IState,
  IFailureAction,
} from "@/contracts/trackingDelivery/create-duck";

const { Types, Creators } = createActions(
  {
    request: ["postData", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "GEOLOCATION_CREATE_" }
);

export interface GeolocationCreateState extends IState {}

const INITIAL_STATE: GeolocationCreateState = {
  loading: false,
  error: null,
};

const request = (state: GeolocationCreateState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: GeolocationCreateState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: GeolocationCreateState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const geolocationCreate = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const GeolocationCreateTypes = Types;
export const GeolocationCreateActions = Creators;
