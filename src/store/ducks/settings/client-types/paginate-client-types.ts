import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import {
  IState,
  ISuccessAction,
  IFailureAction,
} from "interfaces/paginate-duck";
import { ClientType } from "interfaces/client-type";

const { Types, Creators } = createActions(
  {
    request: ["query"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "PAGINATE_CLIENT_TYPES_" }
);

export interface PaginateClientTypesState extends IState {
  data: ClientType[] | Record<string, any>[];
}

const INITIAL_STATE: PaginateClientTypesState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

const request = (state: PaginateClientTypesState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: PaginateClientTypesState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    pagination: { $set: action.pagination },
    loading: { $set: false },
  });

const failure = (state: PaginateClientTypesState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const paginateClientTypes = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const PaginateClientTypesTypes = Types;
export const PaginateClientTypesActions = Creators;
