import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type {
  Indicators, Document
} from "contracts/trackingDelivery";

const { Types, Creators } = createActions(
  {
    request: ["query", "statusFilter", "onSuccess", "onFailure"],
    success: ["documents", "indicators"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "FILTER_LIST_DOCUMENTS_",
  }
);

export const DocumentsFilterListTypes = Types;
export const DocumentsFilterListActions = Creators;

export interface DocumentsFilterListState {
  documents: Document[];
  indicators: Indicators;
  loading: boolean;
  error: string | null;
}

export interface DocumentsFilterListRequestAction {
  query?: any;
  statusFilter?: string[];
  error: string | null;
  onSuccess?: (documents: Document[], indicators: Indicators) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  documents: Document[];
  indicators: Indicators;
  loading: boolean;
}

interface FailureAction {
  error: string;
  loading: boolean;
}

const INITIAL_STATE: DocumentsFilterListState = {
  documents: [],
  indicators: {} as Indicators,
  loading: false,
  error: null,
};

const _request = (state: DocumentsFilterListState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: DocumentsFilterListState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    documents: { $set: action.documents },
    indicators: { $set: action.indicators },
  });
}

const _failure = (state: DocumentsFilterListState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const documentsFilterList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
