import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/create-duck";

const { Types, Creators } = createActions(
  {
    request: ["postData", "onSuccess", "onFailure"],
    success: [],
    failure: ["error"],
    reset: [],
  },
  { prefix: "CREATE_PALLET_TYPE" }
);

export interface CreatePalletTypeState extends IState {}

const INITIAL_STATE: CreatePalletTypeState = {
  loading: false,
  error: null,
};

const request = (state: CreatePalletTypeState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: CreatePalletTypeState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: CreatePalletTypeState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const createPalletType = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const CreatePalletTypeTypes = Types;
export const CreatePalletTypeActions = Creators;
