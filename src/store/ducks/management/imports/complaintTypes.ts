import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { ComplaintTypesData, ComplaintTypesQuery } from "contracts/management";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "COMPLAINT_TYPES_IMPORTS_",
  }
);

export const ComplaintTypesTypes = Types;
export const ComplaintTypesActions = Creators;

export interface ComplaintTypesState {
  data: ComplaintTypesData[];
  loading: boolean;
  error: string | null;
}
export interface ComplaintTypesRequestAction {
  query?: ComplaintTypesQuery;
  error: string | null;
  onSuccess?: (data: ComplaintTypesQuery) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ComplaintTypesData[];
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: ComplaintTypesState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state: ComplaintTypesState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ComplaintTypesState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
};

const _failure = (state: ComplaintTypesState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const complaintTypes = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
