import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

const { Types, Creators } = createActions(
  {
    request: ['id','onSuccess','onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'COMEX_JUSTIFICATION_TYPE_SHOW_',
  }
);

export const ShowJustificationTypeTypes = Types;
export const ShowJustificationTypeActions = Creators;

interface IJustificationTypeData {
  id: number,
  category: string,
  description: string,
}

export interface ShowJustificationTypeState {
  data: IJustificationTypeData | null;
  loading: boolean;
  error: string | null;
}

export interface ShowJustificationTypeRequestAction {
  id: number;
  error: string | null;
  onSuccess?: (data: IJustificationTypeData) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: IJustificationTypeData;
}

interface FailureAction {
  error: string;
}

const INITIAL_STATE: ShowJustificationTypeState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state:ShowJustificationTypeState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ShowJustificationTypeState, action: SuccessAction) =>
  update(state, {
  loading: { $set: false },
  data: { $set: action.data }
});

const _failure = (state: ShowJustificationTypeState, action: FailureAction) =>
  update(state, {
  loading: { $set: false },
  error: { $set: action.error },
});

const _reset = () => INITIAL_STATE;

export const showJustificationType = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});