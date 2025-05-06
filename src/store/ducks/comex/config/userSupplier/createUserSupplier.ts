import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';


export type CreateOneUserSupplier = {
  user_id: number;
  supplier_id: number;
};

const { Types, Creators } = createActions(
  {
    request: ['postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'CREATE_USER_SUPPLIER_',
  }
);

export interface CreateUserSupplierState {
  loading: boolean;
  errorMessage: string | null;
}

export interface CreateUserSupplierRequestAction {
  postData: CreateOneUserSupplier;
  onSuccess?: (id: string) => void;
  onFailure?: () => void;
}

interface CreateUserSupplierFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: CreateUserSupplierState = {
  loading: false,
  errorMessage: null,
};

const request = (state: CreateUserSupplierState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: CreateUserSupplierState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: CreateUserSupplierState, action: CreateUserSupplierFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const createUserSupplier = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const CreateUserSupplierTypes = Types;
export const CreateUserSupplierActions = Creators;
