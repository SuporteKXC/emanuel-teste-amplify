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
    prefix: "COMPLAINT_IMAGES_",
  }
);

export const ComplaintImagesTypes = Types;
export const ComplaintImagesActions = Creators;

export interface ComplaintImagesState {
  data: ResponsibleData[] | [];
  loading: boolean;
  error: string | null;
}
export interface ComplaintImagesRequestAction {
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
const INITIAL_STATE: ComplaintImagesState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state: ComplaintImagesState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ComplaintImagesState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
};

const _failure = (state: ComplaintImagesState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const complaintImages = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
