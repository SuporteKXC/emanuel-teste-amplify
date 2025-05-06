import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

const { Types, Creators } = createActions(
  {
    request: ['id', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    softReset: [],
    reset: [],
  },
  {
    prefix: 'DELETE_WAREHOUSE_MEMBER_',
  }
);

export interface DeleteWarehouseMemberState {
  id: number | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface DeleteWarehouseMemberRequestAction {
  id: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: DeleteWarehouseMemberState = {
  id: null,
  loading: false,
  errorMessage: null,
};

const request = (
  state: DeleteWarehouseMemberState,
  action: DeleteWarehouseMemberRequestAction
) =>
  update(state, {
    id: { $set: action.id },
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: DeleteWarehouseMemberState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const failure = (state: DeleteWarehouseMemberState, action: FailureAction) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: DeleteWarehouseMemberState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const deleteWarehouseMember = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const DeleteWarehouseMemberTypes = Types;
export const DeleteWarehouseMemberActions = Creators;
