import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

const { Types, Creators } = createActions(
  {
    request: ['postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'COMEX_NEW_RESPONSIBLE_',
  }
);

export interface NewResponsibleState {
  loading: boolean;
  errorMessage: string | null;
}

export interface NewResponsibleRequestAction {
  postData: { 
    name:string; 
    import_slug: string;
  };
  onSuccess?: (id: string) => void;
  onFailure?: () => void;
}

interface NewResponsibleFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: NewResponsibleState = {
  loading: false,
  errorMessage: null,
};

const request = (state: NewResponsibleState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: NewResponsibleState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: NewResponsibleState, action: NewResponsibleFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const newResponsible = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const NewResponsibleTypes = Types;
export const NewResponsibleActions = Creators;
