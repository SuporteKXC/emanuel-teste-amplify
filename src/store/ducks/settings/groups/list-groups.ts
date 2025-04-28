import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { IGroup } from "interfaces/group";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_GROUPS_" }
);

export interface ListGroupsState extends IState {
  data: IGroup[];
}

interface ISuccessListUnitsAction extends ISuccessAction {
  data: IGroup[];
}

const INITIAL_STATE: ListGroupsState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListGroupsState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListGroupsState, action: ISuccessListUnitsAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListGroupsState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listGroups = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListGroupsTypes = Types;
export const ListGroupsActions = Creators;
