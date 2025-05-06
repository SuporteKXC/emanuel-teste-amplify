import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ListedStockRelatedCompany } from 'contracts/StockManager';

const { Types, Creators } = createActions(
  {
    request: ['query', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'LIST_STOCK_RELATED_COMPANIES_',
  }
);

export interface ListStockRelatedCompaniesState {
  data: ListedStockRelatedCompany[];
  loading: boolean;
  errorMessage: string | null;
}

export interface ListStockRelatedCompaniesRequestAction {
  query?: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ListedStockRelatedCompany[];
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: ListStockRelatedCompaniesState = {
  data: [],
  loading: false,
  errorMessage: null,
};

const request = (state: ListStockRelatedCompaniesState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (
  state: ListStockRelatedCompaniesState,
  action: SuccessAction
) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (
  state: ListStockRelatedCompaniesState,
  action: FailureAction
) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: ListStockRelatedCompaniesState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const listStockRelatedCompanies = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const ListStockRelatedCompaniesTypes = Types;
export const ListStockRelatedCompaniesActions = Creators;
