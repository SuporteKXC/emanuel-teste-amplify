import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { DivergentJustificationCreateData, DivergentJustificationCreatePost } from "contracts/management/DivergentJustification";

const { Types, Creators } = createActions(
    {
      request: ['postData','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'DIVERGENT_JUSTIFICATION_CREATE_MANY',
    }
  );

export const DivergentJustificationCreateManyTypes = Types;
export const DivergentJustificationCreateManyActions = Creators;

export interface DivergentJustificationCreateManyState {
  data: DivergentJustificationCreateData[] | [];
  loading: boolean;
  error: string | null;
}
export interface DivergentJustificationCreateManyRequestAction {
  postData: any;
  error: string | null;
  onSuccess?: (data: DivergentJustificationCreatePost[]) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: DivergentJustificationCreateData[];
}
interface FailureAction {
  error: string;
}
const INITIAL_STATE:DivergentJustificationCreateManyState = {
  data: [],
  loading: false,
  error: null,
};

const _request = (state:DivergentJustificationCreateManyState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: DivergentJustificationCreateManyState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: DivergentJustificationCreateManyState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const divergentJustificationCreateMany = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });