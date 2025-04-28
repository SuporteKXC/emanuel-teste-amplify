import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import {
  IState,
  ISuccessAction,
  IFailureAction,
  IDeleteRequest,
} from "interfaces/delete-duck";

const { Types, Creators } = createActions(
  {
    request: ["userId", "groupId", "onSuccess", "onFailure"],
    success: [],
    failure: ["error"],
    reset: [],
  },
  { prefix: "DELETE_USER_Group_" }
);

export interface DeleteUserGroupState extends IState {}

export interface DeleteUserGroupRequest extends IDeleteRequest {
  userId: number;
  groupId: number;
}
const INITIAL_STATE: DeleteUserGroupState = {
  loading: false,
  error: null,
};

const request = (state: DeleteUserGroupState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: DeleteUserGroupState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: DeleteUserGroupState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const deleteUserGroup = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const DeleteUserGroupTypes = Types;
export const DeleteUserGroupActions = Creators;
