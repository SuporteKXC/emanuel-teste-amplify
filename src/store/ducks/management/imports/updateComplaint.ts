import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { InsertComplaintData } from "contracts/management";

export interface UpdateComplaintState {
  data: InsertComplaintData | null;
  loading: boolean;
  error: string | null;
}

export interface UpdateComplaintRequestAction {
  data: any;
  error: string | null;
  onSuccess?: (data: InsertComplaintData) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: InsertComplaintData;
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}

const { Types, Creators } = createActions(
  {
    request: ["data", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "UPDATE_COMPLAINT_IMPORTS_",
  }
);

export const UpdateComplaintTypes = Types;
export const UpdateComplaintActions = Creators;

const INITIAL_STATE: UpdateComplaintState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: UpdateComplaintState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: UpdateComplaintState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
};

const _failure = (state: UpdateComplaintState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const updateComplaint = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
