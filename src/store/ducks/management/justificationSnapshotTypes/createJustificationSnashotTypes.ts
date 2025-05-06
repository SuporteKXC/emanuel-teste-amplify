import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { JustificationSnapshotTypeCreateData } from "contracts/management";

const { Types, Creators } = createActions(
    {
      request: ['postData','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'JUSTIFICATION_SNAPSHOT_TYPE_NEW',
    }
  );

export const JustificationSnapshotTypeCreateTypes = Types;
export const JustificationSnapshotTypeCreateActions = Creators;

export interface JustificationSnapshotTypeState {
    data: JustificationSnapshotTypeCreateData[] | [];
    loading: boolean;
    error: string | null;
  }
export interface JustificationSnapshotTypeCreateRequestAction {
    postData: any;
    error: string | null;
    onSuccess?: (data:JustificationSnapshotTypeCreateData) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
  data: JustificationSnapshotTypeCreateData[];
}
interface FailureAction {
  error: string;
}
const INITIAL_STATE:JustificationSnapshotTypeState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state:JustificationSnapshotTypeState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: JustificationSnapshotTypeState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: JustificationSnapshotTypeState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const justificationSnapshotTypeCreate = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });