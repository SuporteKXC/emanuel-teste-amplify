import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { IRole } from "interfaces/role";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_ROLES_" }
);

export interface ListRolesState extends IState {
  data: IRole[];
}

interface ISuccessListUnitsAction extends ISuccessAction {
  data: IRole[];
}

const INITIAL_STATE: ListRolesState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListRolesState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListRolesState, action: ISuccessListUnitsAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListRolesState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listRoles = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListRolesTypes = Types;
export const ListRolesActions = Creators;
