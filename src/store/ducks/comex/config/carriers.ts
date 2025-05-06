import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'COMEX_CARRIER_',
    }
  );

export const CarrierListTypes = Types;
export const CarrierActions = Creators;

export interface CarrierState {
    data: any[] | null;
    loading: boolean;
    error: string | null;
  }
export interface CarrierRequestAction {
    data: { id:number; name: string };
    error: string | null;
    onSuccess?: (data: any) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
    data: any[];
    loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: CarrierState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: CarrierState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: CarrierState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: CarrierState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const carrier = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });