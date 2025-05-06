import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type {
  Carrier
} from "contracts/general";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "LIST_CARRIERS_",
  }
);

export const CarriersListTypes = Types;
export const CarriersListActions = Creators;

export interface CarriersListState {
  data: Carrier[];
  loading: boolean;
  error: string | null;
}

export interface CarriersListRequestAction {
  query?: any;
  error: string | null;
  onSuccess?: (data: Carrier) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: Carrier[];
  loading: boolean;
}

interface FailureAction {
  error: string;
  loading: boolean;
}

const INITIAL_STATE: CarriersListState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state: CarriersListState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: CarriersListState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
}

const _failure = (state: CarriersListState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const carriersList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
