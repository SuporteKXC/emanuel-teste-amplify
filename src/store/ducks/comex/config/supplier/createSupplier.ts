import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';


export type CreateSupplier = {
  
    code: string;
    description: string;
    user: any[];
    isSpecial: 1 | 0
};
const { Types, Creators } = createActions(
  {
    request: ['postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'NEW_SUPPLIER_',
  }
);

export interface NewSupplierState {
  loading: boolean;
  errorMessage: string | null;
}

export interface NewSupplierRequestAction {
  postData: CreateSupplier;
  onSuccess?: (id: string) => void;
  onFailure?: () => void;
}

interface NewSupplierFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: NewSupplierState = {
  loading: false,
  errorMessage: null,
};

const request = (state: NewSupplierState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: NewSupplierState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: NewSupplierState, action: NewSupplierFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const newSupplier = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const NewSupplierTypes = Types;
export const NewSupplierActions = Creators;
