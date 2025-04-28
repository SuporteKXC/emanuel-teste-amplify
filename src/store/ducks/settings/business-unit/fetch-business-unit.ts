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
  { prefix: "FETCH_BUSINESS_UNIT_" }
);

export interface FetchBusinessUnitState extends IState {}

const INITIAL_STATE: FetchBusinessUnitState = {
  data: null,
  loading: false,
  error: null,
};

const request = (state: FetchBusinessUnitState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: FetchBusinessUnitState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: FetchBusinessUnitState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const fetchBusinessUnit = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const FetchBusinessUnitTypes = Types;
export const FetchBusinessUnitActions = Creators;
