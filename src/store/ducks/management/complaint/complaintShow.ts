import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { ComplaintData } from "@/contracts/management";

const { Types, Creators } = createActions(
  {
    request: ["id", "showComplaintSuccess", "showComplaintError"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "SHOW_COMPLAINT_",
  }
);

export const ComplaintShowTypes = Types;
export const ComplaintShowActions = Creators;

export interface ComplaintShowState {
  data: ComplaintData | null;
  loading: boolean;
  error: string | null;
}
export interface ComplaintShowRequestAction {
  error: string | null;
}

interface SuccessAction {
  data: ComplaintData;
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: ComplaintShowState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: ComplaintShowState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ComplaintShowState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
};

const _failure = (state: ComplaintShowState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const complaintShow = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
