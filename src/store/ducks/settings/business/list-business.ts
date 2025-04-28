import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { Business } from "interfaces/business";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_BUSINESS_" }
);

export interface ListBusinessState extends IState {
  data: Business[];
}

interface ISuccessListUnitsAction extends ISuccessAction {
  data: Business[];
}

const INITIAL_STATE: ListBusinessState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListBusinessState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListBusinessState, action: ISuccessListUnitsAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListBusinessState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listBusiness = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListBusinessTypes = Types;
export const ListBusinessActions = Creators;
