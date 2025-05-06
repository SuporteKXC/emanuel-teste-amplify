import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { Carrier } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["errorMessage"],
    softReset: [],
    reset: [],
  },
  {
    prefix: "FETCH_CARRIER_",
  }
);

export interface FetchCarrierState {
  data: Carrier | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface FetchCarrierRequestAction {
  id: number;
  onSuccess?: (data: Carrier) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: Carrier;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: FetchCarrierState = {
  data: null,
  loading: false,
  errorMessage: null,
};

const request = (state: FetchCarrierState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: FetchCarrierState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: FetchCarrierState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: FetchCarrierState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = (state: FetchCarrierState) =>
  update(state, {
    loading: { $set: false },
    data: { $set: null },
  });

export const fetchCarrier = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const FetchCarrierTypes = Types;
export const FetchCarrierActions = Creators;
