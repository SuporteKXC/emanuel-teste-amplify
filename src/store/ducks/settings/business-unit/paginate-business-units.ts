import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import {
  IState,
  ISuccessAction,
  IFailureAction,
} from "interfaces/paginate-duck";
import { BusinessUnit } from "interfaces/business-unit";

const { Types, Creators } = createActions(
  {
    request: ["query"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "PAGINATE_BUSINESS_UNIT_" }
);

export interface PaginateBusinessUnitsState extends IState {
  data: BusinessUnit[] | Record<string, any>[];
}

const INITIAL_STATE: PaginateBusinessUnitsState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

const request = (state: PaginateBusinessUnitsState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: PaginateBusinessUnitsState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    pagination: { $set: action.pagination },
    loading: { $set: false },
  });

const failure = (state: PaginateBusinessUnitsState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const paginateBusinessUnits = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const PaginateBusinessUnitsTypes = Types;
export const PaginateBusinessUnitsActions = Creators;
