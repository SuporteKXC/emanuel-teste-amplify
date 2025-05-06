import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { JustificationData } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['postData','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'COMEX_JUSTIFICATION_NEW',
    }
  );

export const NewJustificationTypes = Types;
export const NewJustificationActions = Creators;

export interface JustificationNewState {
    data: JustificationData[] | [];
    loading: boolean;
    error: string | null;
  }
export interface NewJustificationRequestAction {
    postData: any;
    error: string | null;
    onSuccess?: (data:JustificationData) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
  data: JustificationData[];
}
interface FailureAction {
  error: string;
}
const INITIAL_STATE:JustificationNewState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state:JustificationNewState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: JustificationNewState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: JustificationNewState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const newJustification = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });