import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ListedStock } from 'contracts/Stocks';

const { Types, Creators } = createActions(
  {
    request: ['query', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'EXPORT_STOCKS_',
  }
);

export interface ExportStocksState {
  data: ListedStock[];
  loading: boolean;
  errorMessage: string | null;
}

export interface ExportStocksRequestAction {
  query?: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ListedStock[];
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: ExportStocksState = {
  data: [],
  loading: false,
  errorMessage: null,
};

const request = (state: ExportStocksState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: ExportStocksState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: ExportStocksState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: ExportStocksState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const exportStocks = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const ExportStocksTypes = Types;
export const ExportStocksActions = Creators;
