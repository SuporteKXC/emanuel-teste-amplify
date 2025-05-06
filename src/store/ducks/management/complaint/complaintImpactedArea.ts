import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { Company } from "contracts/management";
import { ResponsibleData } from "@/contracts";

const { Types, Creators } = createActions(
  {
    request: [],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "LIST_COMPLAINT_IMPACTED_AREA_",
  }
);

export const ComplaintImpactedAreaTypes = Types;
export const ComplaintImpactedAreaActions = Creators;

export interface ComplaintImpactedAreaState {
  data: ResponsibleData[] | [];
  loading: boolean;
  error: string | null;
}
export interface ComplaintImpactedAreaRequestAction {
  error: string | null;
}

interface SuccessAction {
  data: ResponsibleData[];
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: ComplaintImpactedAreaState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state: ComplaintImpactedAreaState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ComplaintImpactedAreaState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
};

const _failure = (state: ComplaintImpactedAreaState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const complaintImpactedArea = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
