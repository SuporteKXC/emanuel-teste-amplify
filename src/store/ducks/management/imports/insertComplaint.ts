import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { InsertComplaintData } from "contracts/management";


export interface InsertComplaintState {
  data: InsertComplaintData | null;
  loading: boolean;
  error: string | null;
}

export interface InsertComplaintRequestAction {
  data: any
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
      prefix: "INSERT_COMPLAINT_IMPORTS_",
    }
  );
  
export const InsertComplaintTypes = Types;
export const InsertComplaintActions = Creators;

const INITIAL_STATE: InsertComplaintState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: InsertComplaintState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: InsertComplaintState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
};

const _failure = (state: InsertComplaintState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const InsertComplaint = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
