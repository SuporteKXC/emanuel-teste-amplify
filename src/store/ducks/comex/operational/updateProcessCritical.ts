import update from "immutability-helper";
import { createActions, createReducer } from "reduxsauce";

type TUpdateProcessCritical = {
  ids: number[];
};

const { Types, Creators } = createActions(
  {
    request: ["postData", "onSuccess", "onFailure"],
    success: [],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "COMEX_UPDATE_PROCESS_CRITICAL_",
  }
);

export interface UpdateProcessCriticalState {
  data: any;
  loading: boolean;
  error: string | null;
}

export interface UpdateProcessCriticalRequestAction {
  postData: TUpdateProcessCritical;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: UpdateProcessCriticalState = {
  data: null,
  loading: false,
  error: null,
};

const request = (state: UpdateProcessCriticalState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const success = (state: UpdateProcessCriticalState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateProcessCriticalState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const updateProcessCritical = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateProcessCriticalTypes = Types;
export const UpdateProcessCriticalActions = Creators;