import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import type { OrderFile } from '@/contracts/comex/OrderFile';

interface PostData {
  file:{order_id: string,
  fileLink: string
  description: string}[]
}


const { Types, Creators } = createActions(
  {
    request: ['id','postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'COMEX_UPDATE_ORDER_FILE_',
  }
);

export interface UpdateOrderFileState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UpdateOrderFileRequestAction { 
  id: number;
  postData: PostData ;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface UpdateOrderFileFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UpdateOrderFileState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UpdateOrderFileState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: UpdateOrderFileState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateOrderFileState, action: UpdateOrderFileFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const updateOrderFile = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateOrderFileTypes = Types;
export const UpdateOrderFileActions = Creators;
