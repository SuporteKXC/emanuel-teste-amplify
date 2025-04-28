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
    request: ["userId", "businessLineId", "onSuccess", "onFailure"],
    success: [],
    failure: ["error"],
    reset: [],
  },
  { prefix: "DELETE_USER_BUSINESS_LINE_" }
);

export interface DeleteUserBusinessLineState extends IState {}

export interface DeleteUserBusinessLineRequest extends IDeleteRequest {
  userId: number;
  businessLineId: number;
}
const INITIAL_STATE: DeleteUserBusinessLineState = {
  loading: false,
  error: null,
};

const request = (state: DeleteUserBusinessLineState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: DeleteUserBusinessLineState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: DeleteUserBusinessLineState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const deleteUserBusinessLine = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const DeleteUserBusinessLineTypes = Types;
export const DeleteUserBusinessLineActions = Creators;
