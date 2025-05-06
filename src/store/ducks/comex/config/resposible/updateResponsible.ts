import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

const { Types, Creators } = createActions(
  {
    request: ['id','postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'COMEX_UPDATE_RESPONSIBLE_',
  }
);

export interface UpdateResponsibleState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UpdateResponsibleRequestAction {
  id:number;
  postData: { 
    name:string; 
    import_slug: string;
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface UpdateResponsibleFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UpdateResponsibleState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UpdateResponsibleState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: UpdateResponsibleState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateResponsibleState, action: UpdateResponsibleFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const updateResponsible = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateResponsibleTypes = Types;
export const UpdateResponsibleActions = Creators;
