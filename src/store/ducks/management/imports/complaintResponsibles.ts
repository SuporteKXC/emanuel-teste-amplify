import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { ComplaintResponsiblesData, ComplaintResponsiblesQuery } from "contracts/management";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "COMPLAINT_RESPONSIBLES_IMPORTS_",
  }
);

export const ComplaintResponsiblesTypes = Types;
export const ComplaintResponsiblesActions = Creators;

export interface ComplaintResponsiblesState {
  data: ComplaintResponsiblesData[];
  loading: boolean;
  error: string | null;
}
export interface ComplaintResponsiblesRequestAction {
  query?: ComplaintResponsiblesQuery;
  error: string | null;
  onSuccess?: (data: ComplaintResponsiblesQuery) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ComplaintResponsiblesData[];
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: ComplaintResponsiblesState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state: ComplaintResponsiblesState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ComplaintResponsiblesState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
};

const _failure = (state: ComplaintResponsiblesState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const complaintResponsibles = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
