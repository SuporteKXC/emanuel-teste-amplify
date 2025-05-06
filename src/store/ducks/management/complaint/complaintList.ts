import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { ComplaintData } from "@/contracts/management";
import { CamelPagination } from "@/contracts";

const { Types, Creators } = createActions(
  {
    request: ["filter"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "LIST_COMPLAINT_",
  }
);

export const ComplaintListTypes = Types;
export const ComplaintListActions = Creators;

export interface ComplaintListState {
  data: ComplaintData[] | [];
  pagination?: CamelPagination;
  loading: boolean;
  error: string | null;
}
export interface ComplaintListRequestAction {
  error: string | null;
}

interface SuccessAction {
  data: ComplaintData[];
  pagination: CamelPagination;
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: ComplaintListState = {
  data: [],
  loading: false,
  pagination: undefined,
  error: null,
};

const _request = (state: ComplaintListState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ComplaintListState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    pagination: { $set: action.pagination },
  });
};

const _failure = (state: ComplaintListState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const complaintList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
