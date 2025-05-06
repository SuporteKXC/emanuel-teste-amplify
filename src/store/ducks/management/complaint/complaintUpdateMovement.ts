import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

const { Types, Creators } = createActions(
    {
      request: ['id','postData','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'COMPLAINT_UPDATE_MOVEMENT',
    }
  );

export const ComplaintUpdateMovementTypes = Types;
export const ComplaintUpdateMovementActions = Creators;

export interface ComplaintUpdateMovementState {
  data: any[] | [];
  loading: boolean;
  error: string | null;
}
export interface ComplaintUpdateMovementRequestAction {
  id: number
  postData: any;
  error: string | null;
  onSuccess?: (data: any) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: any[];
}
interface FailureAction {
  error: string;
}
const INITIAL_STATE:ComplaintUpdateMovementState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state:ComplaintUpdateMovementState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ComplaintUpdateMovementState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: ComplaintUpdateMovementState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const complaintUpdateMovement = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });