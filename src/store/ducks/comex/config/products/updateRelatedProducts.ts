import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

const { Types, Creators } = createActions(
  {
    request: ['id', 'postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'COMEX_UPDATE_RELATED_PRODUCT_',
  }
);

export interface UpdateRelatedProductState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UpdateRelatedProductRequestAction {
  id: number;
  postData: { 
    description:string; 
    code: string;
    responsibles?: {
      responsible_id: number;
    };
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface UpdateRelatedProductFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UpdateRelatedProductState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UpdateRelatedProductState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: UpdateRelatedProductState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateRelatedProductState, action: UpdateRelatedProductFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const updateRelatedProduct = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateRelatedProductTypes = Types;
export const UpdateRelatedProductActions = Creators;
