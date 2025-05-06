import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';


export type CreateUserSupplier = {
    user_id: string,
    supplier_id: string,
};
const { Types, Creators } = createActions(
  {
    request: ['postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'NEW_USER_SUPPLIER_',
  }
);

export interface NewUserSupplierState {
  loading: boolean;
  errorMessage: string | null;
}

export interface NewUserSupplierRequestAction {
  postData: CreateUserSupplier[];
  onSuccess?: (id: string) => void;
  onFailure?: () => void;
}

interface NewUserSupplierFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: NewUserSupplierState = {
  loading: false,
  errorMessage: null,
};

const request = (state: NewUserSupplierState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: NewUserSupplierState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: NewUserSupplierState, action: NewUserSupplierFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const newUserSupplier = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const NewUserSupplierTypes = Types;
export const NewUserSupplierActions = Creators;
