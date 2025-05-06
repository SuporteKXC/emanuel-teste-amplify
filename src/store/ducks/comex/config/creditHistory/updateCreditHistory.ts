import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

const { Types, Creators } = createActions(
  {
    request: ["id", "postData", "onSuccess", "onFailure"],
    success: [],
    failure: ["errorMessage"],
    reset: [],
  },
  {
    prefix: "COMEX_UPDATE_CREDIT_HISTORY_",
  }
);

export interface UpdateCreditHistoryState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UpdateCreditHistoryRequestAction {
  id: number;
  postData: {
    description: string;
    details: string;
    roles: string[];
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface UpdateCreditHistoryFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UpdateCreditHistoryState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UpdateCreditHistoryState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: UpdateCreditHistoryState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (
  state: UpdateCreditHistoryState,
  action: UpdateCreditHistoryFailureAction
) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const updateCreditHistory = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateCreditHistoryTypes = Types;
export const UpdateCreditHistoryActions = Creators;
