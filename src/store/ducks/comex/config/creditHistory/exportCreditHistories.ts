import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { ICreditHistory } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ['params','onSuccess','onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  { prefix: 'COMEX_EXPORT_CREDIT_HISTORIES_' }
);

export interface ExportCreditHistoriesState {
  data: {
    creditHistories: ICreditHistory[] | null
    meta: any
  };
  loading: boolean;
  error: string | null;
}

export interface ExportCreditHistoriesRequestAction {
  data: {
    creditHistories: ICreditHistory[] | null
    meta: any
  };
  error: string | null;
  onSuccess?: (data: any) => void;
  onFailure?: () => void;
  params: any;
}

interface ISuccessAction {
  data: {
    creditHistories: ICreditHistory[] | null
    meta: any
  };
}

 interface IFailureAction {
  errorMessage: string;
}

const INITIAL_STATE: ExportCreditHistoriesState = {
  data: {
    meta: null,
    creditHistories: null
  },
  loading: false,
  error: null,
};

const request = (state: ExportCreditHistoriesState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (
  state: ExportCreditHistoriesState,
  action: ISuccessAction
) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ExportCreditHistoriesState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const exportCreditHistories = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ExportCreditHistoriesTypes = Types;
export const ExportCreditHistoriesActions = Creators;