import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { ResponseWarehouseMember, WarehouseMember } from 'contracts/WarehouseMembers';

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: ['data'],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'FETCH_WAREHOUSE_MEMBER_',
  }
);

export interface FetchWarehouseMemberState {
  data: ResponseWarehouseMember | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface FetchWarehouseMemberRequestAction {
  id: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ResponseWarehouseMember;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: FetchWarehouseMemberState = {
  data: null,
  loading: false,
  errorMessage: null,
};

const request = (state: FetchWarehouseMemberState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: FetchWarehouseMemberState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: FetchWarehouseMemberState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: FetchWarehouseMemberState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const fetchWarehouseMember = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const FetchWarehouseMemberTypes = Types;
export const FetchWarehouseMemberActions = Creators;
