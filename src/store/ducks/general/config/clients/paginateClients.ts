import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { Client } from 'contracts/general/Client';
import type { CamelPagination } from 'contracts';

const { Types, Creators } = createActions(
  {
    request: ['query', 'onSuccess', 'onFailure'],
    success: ['data', 'pagination'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'PAGINATE_CLIENTS_',
  }
);

export interface PaginateClientsState {
  data: Client[];
  pagination?: CamelPagination;
  loading: boolean;
  errorMessage: string | null;
}

export interface PaginateClientsRequestAction {
  query?: Record<string, any>;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: Client[];
  pagination: CamelPagination;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: PaginateClientsState = {
  data: [],
  loading: false,
  errorMessage: null,
};

const request = (state: PaginateClientsState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: PaginateClientsState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    pagination: { $set: action.pagination },
  });

const failure = (state: PaginateClientsState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: PaginateClientsState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const paginateClients = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const PaginateClientsTypes = Types;
export const PaginateClientsActions = Creators;
