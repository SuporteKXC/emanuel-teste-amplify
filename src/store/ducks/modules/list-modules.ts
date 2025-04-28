import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { Module } from "interfaces/module";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_MODULES_" }
);

export interface ListModulesState extends IState {
  data: Module[];
}

interface ISuccessListUnitsAction extends ISuccessAction {
  data: Module[];
}

const INITIAL_STATE: ListModulesState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListModulesState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListModulesState, action: ISuccessListUnitsAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListModulesState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listModules = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListModulesTypes = Types;
export const ListModulesActions = Creators;
