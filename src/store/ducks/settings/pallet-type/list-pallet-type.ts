import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { IPalletType } from "interfaces/pallet-type";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_PALLET_TYPE" }
);

export interface ListPalletTypeState extends IState {
  data: IPalletType[];
}

interface ISuccessListPalletTypeAction extends ISuccessAction {
  data: IPalletType[];
}

const INITIAL_STATE: ListPalletTypeState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListPalletTypeState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListPalletTypeState, action: ISuccessListPalletTypeAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListPalletTypeState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listPalletType = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListPalletTypeTypes = Types;
export const ListPalletTypeActions = Creators;
