import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { Client } from "interfaces/client";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_CLIENTS_" }
);

export interface ListClientsState extends IState {
  data: Client[];
}

interface ISuccessListUnitsAction extends ISuccessAction {
  data: Client[];
}

const INITIAL_STATE: ListClientsState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListClientsState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListClientsState, action: ISuccessListUnitsAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListClientsState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listClients = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListClientsTypes = Types;
export const ListClientsActions = Creators;
