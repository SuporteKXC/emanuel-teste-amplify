import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/fetch-duck";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "FETCH_PALLET_TYPE" }
);

export interface FetchPalletTypeState extends IState {}

const INITIAL_STATE: FetchPalletTypeState = {
  data: null,
  loading: false,
  error: null,
};

const request = (state: FetchPalletTypeState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: FetchPalletTypeState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: FetchPalletTypeState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const fetchPalletType = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const FetchPalletTypeTypes = Types;
export const FetchPalletTypeActions = Creators;
