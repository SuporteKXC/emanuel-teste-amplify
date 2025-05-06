import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { DivergentJustificationCreateData } from "contracts/management/DivergentJustification";

const { Types, Creators } = createActions(
    {
      request: ['postData','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'DIVERGENT_JUSTIFICATION_NEW',
    }
  );

export const DivergentJustificationCreateTypes = Types;
export const DivergentJustificationCreateActions = Creators;

export interface DivergentJustificationCreateState {
  data: DivergentJustificationCreateData[] | [];
  loading: boolean;
  error: string | null;
}
export interface DivergentJustificationCreateRequestAction {
  postData: any;
  error: string | null;
  onSuccess?: (data: DivergentJustificationCreateData) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: DivergentJustificationCreateData[];
}
interface FailureAction {
  error: string;
}
const INITIAL_STATE:DivergentJustificationCreateState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state:DivergentJustificationCreateState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: DivergentJustificationCreateState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: DivergentJustificationCreateState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const divergentJustificationCreate = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });