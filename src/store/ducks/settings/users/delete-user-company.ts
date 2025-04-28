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
    request: ["userId", "companyId", "onSuccess", "onFailure"],
    success: [],
    failure: ["error"],
    reset: [],
  },
  { prefix: "DELETE_USER_COMPANY_" }
);

export interface DeleteUserCompanyState extends IState {}

export interface DeleteUserCompanyRequest extends IDeleteRequest {
  userId: number;
  companyId: number;
}
const INITIAL_STATE: DeleteUserCompanyState = {
  loading: false,
  error: null,
};

const request = (state: DeleteUserCompanyState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: DeleteUserCompanyState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: DeleteUserCompanyState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const deleteUserCompany = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const DeleteUserCompanyTypes = Types;
export const DeleteUserCompanyActions = Creators;
