import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { IRegion } from "interfaces/region";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_BUSINESS_UNITS_" }
);

export interface ListBusinessUnitsState extends IState {
  data: IRegion[];
}

interface ISuccessListBusinessUnitsAction extends ISuccessAction {
  data: IRegion[];
}

const INITIAL_STATE: ListBusinessUnitsState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListBusinessUnitsState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (
  state: ListBusinessUnitsState,
  action: ISuccessListBusinessUnitsAction
) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListBusinessUnitsState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listBusinessUnits = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListBusinessUnitsTypes = Types;
export const ListBusinessUnitsActions = Creators;
