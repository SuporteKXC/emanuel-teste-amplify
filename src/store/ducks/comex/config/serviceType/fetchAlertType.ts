import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IServiceType } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ["id", "onSuccess", "onFailure"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "COMEX_SERVICE_TYPE_FETCH_",
  }
);

export const FetchServiceTypeTypes = Types;
export const FetchServiceTypeActions = Creators;

interface IServiceTypeData extends IServiceType {}

export interface FetchServiceTypeState {
  data: IServiceTypeData | undefined;
  loading: boolean;
  error: string | null;
}

export interface FetchServiceTypeRequestAction {
  id: number;
  error: string | null;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: IServiceTypeData;
}

interface FailureAction {
  error: string;
}

const INITIAL_STATE: FetchServiceTypeState = {
  data: undefined,
  loading: false,
  error: null,
};

const _request = (state: FetchServiceTypeState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: FetchServiceTypeState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const _failure = (state: FetchServiceTypeState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const serviceType = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
