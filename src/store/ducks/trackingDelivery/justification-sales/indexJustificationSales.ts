import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type {
  JustificationSales
} from "contracts/justificationSales";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "INDEX_JUSTIFICATION_SALES",
  }
);

export const JustificationSalesIndexTypes = Types;
export const JustificationSalesIndexActions = Creators;

export interface JustificationSalesIndexState {
  data: JustificationSales[];
  loading: boolean;
  error: string | null;
}

export interface JustificationSalesIndexRequestAction {
  query?: any;
  error: string | null;
  onSuccess?: (data: JustificationSales[]) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: JustificationSales[];
  loading: boolean;
}

interface FailureAction {
  error: string;
  loading: boolean;
}

const INITIAL_STATE: JustificationSalesIndexState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state: JustificationSalesIndexState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: JustificationSalesIndexState, action: SuccessAction) => {
  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });
}

const _failure = (state: JustificationSalesIndexState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const justificationSalesIndex = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
