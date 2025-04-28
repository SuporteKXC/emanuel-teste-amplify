import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import {
  IState,
  ISuccessAction,
  IFailureAction,
} from "interfaces/paginate-duck";
import { PalletType } from "interfaces/pallet-type";

const { Types, Creators } = createActions(
  {
    request: ["query"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "PAGINATE_PALLET_TYPES" }
);

export interface PaginatePalletTypeState extends IState {
  data: PalletType[] | Record<string, any>[];
}

const INITIAL_STATE: PaginatePalletTypeState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

const request = (state: PaginatePalletTypeState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: PaginatePalletTypeState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    pagination: { $set: action.pagination },
    loading: { $set: false },
  });

const failure = (state: PaginatePalletTypeState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const paginatePalletType = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const PaginatePalletTypeTypes = Types;
export const PaginatePalletTypeActions = Creators;
