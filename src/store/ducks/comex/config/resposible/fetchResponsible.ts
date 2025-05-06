import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
// import type { UserData, RoleData, CompanyData } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['id','onSuccess','onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'COMEX_RESPONSIBLE_FETCH_',
  }
);

export const FetchResponsibleTypes = Types;
export const FetchResponsibleActions = Creators;

interface IResponsibleData {
  id: number,
  name: string,
  import_slug: string
}

export interface FetchResponsibleState {
  data: IResponsibleData | null;
  loading: boolean;
  error: string | null;
}

export interface FetchResponsibleRequestAction {
  id: number;
  error: string | null;
  onSuccess?: (data: IResponsibleData) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: IResponsibleData;
}

interface FailureAction {
  error: string;
}

const INITIAL_STATE: FetchResponsibleState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state:FetchResponsibleState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: FetchResponsibleState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: FetchResponsibleState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const responsible = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });