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
    prefix: 'DELETE_COMPANY_MEMBER_',
  }
);

export interface DeleteCompanyMemberState {
  id: number | null;
  loading: boolean;
  errorMessage: string | null;
}

export interface DeleteCompanyMemberRequestAction {
  id: number;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: DeleteCompanyMemberState = {
  id: null,
  loading: false,
  errorMessage: null,
};

const request = (
  state: DeleteCompanyMemberState,
  action: DeleteCompanyMemberRequestAction
) =>
  update(state, {
    id: { $set: action.id },
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: DeleteCompanyMemberState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const failure = (state: DeleteCompanyMemberState, action: FailureAction) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: DeleteCompanyMemberState) =>
  update(state, {
    id: { $set: null },
    loading: { $set: false },
  });

const reset = () => INITIAL_STATE;

export const deleteCompanyMember = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const DeleteCompanyMemberTypes = Types;
export const DeleteCompanyMemberActions = Creators;
