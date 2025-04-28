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
    request: ["emailID", "onSuccess", "onFailure"],
    success: [],
    failure: ["error"],
    reset: [],
  },
  { prefix: "DELETE_USER_SECONDARY_EMAIL_" }
);

export interface DeleteUserSecondaryEmailState extends IState {}

export interface DeleteUserSecondaryEmailRequest extends IDeleteRequest {
  emailID: number;
}
const INITIAL_STATE: DeleteUserSecondaryEmailState = {
  loading: false,
  error: null,
};

const request = (state: DeleteUserSecondaryEmailState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: DeleteUserSecondaryEmailState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: DeleteUserSecondaryEmailState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const deleteUserSecondaryEmail = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const DeleteUserSecondaryEmailTypes = Types;
export const DeleteUserSecondaryEmailActions = Creators;
