import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
// import type { Product } from "contracts/management";


export interface IComplaintUploadFileData {
    urlSigned: string
    fileKey: string
}

const { Types, Creators } = createActions(
  {
    request: ["file", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "COMPLAINT_UPLOAD_FILE_",
  }
);

export const ComplaintUploadFileTypes = Types;
export const ComplaintUploadFileActions = Creators;

export interface ComplaintUploadtState {
  data: IComplaintUploadFileData | null
  loading: boolean;
  error: string | null;
}
export interface ComplaintUploadFileRequestAction {
  file?: any;
  error: string | null;
  onSuccess?: (data: IComplaintUploadFileData[]) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: IComplaintUploadFileData;
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: ComplaintUploadtState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: ComplaintUploadtState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ComplaintUploadtState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
};

const _failure = (state: ComplaintUploadtState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const complaintUploadFile = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
