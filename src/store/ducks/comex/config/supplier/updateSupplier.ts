import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';


export type UpdateSupplier = {
  
    code: string;
    description: string;
    isSpecial: 1 | 0
};
const { Types, Creators } = createActions(
  {
    request: ['postData','id', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'UPDATE_SUPPLIER_',
  }
);

export interface UpdateSupplierState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UpdateSupplierRequestAction {
  postData: UpdateSupplier;
  id: number;
  onSuccess?: (id: string) => void;
  onFailure?: () => void;
}

interface UpdateSupplierFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UpdateSupplierState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UpdateSupplierState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: UpdateSupplierState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateSupplierState, action: UpdateSupplierFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const updateSupplier = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateSupplierTypes = Types;
export const UpdateSupplierActions = Creators;
