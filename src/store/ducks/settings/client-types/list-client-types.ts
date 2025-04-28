import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { ClientType } from "interfaces/client-type";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_CLIENT_TYPES_" }
);

export interface ListClientTypesState extends IState {
  data: ClientType[];
}

interface ISuccessListUnitsAction extends ISuccessAction {
  data: ClientType[];
}

const INITIAL_STATE: ListClientTypesState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListClientTypesState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (
  state: ListClientTypesState,
  action: ISuccessListUnitsAction
) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListClientTypesState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listClientTypes = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListClientTypesTypes = Types;
export const ListClientTypesActions = Creators;
