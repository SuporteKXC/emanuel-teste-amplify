import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type {
  Document
} from "contracts/trackingDelivery";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "FETCH_DOCUMENT_",
  }
);

export const DocumentFetchTypes = Types;
export const DocumentFetchActions = Creators;

export interface DocumentFetchState {
  data: Document | null;
  loading: boolean;
  error: string | null;
}

export interface DocumentFetchRequestAction {
  id: number;
  error: string | null;
  onSuccess?: (data: Document) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: Document;
  loading: boolean;
}

interface FailureAction {
  error: string;
  loading: boolean;
}

const INITIAL_STATE: DocumentFetchState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: DocumentFetchState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: DocumentFetchState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
}

const _failure = (state: DocumentFetchState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const documentFetch = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
