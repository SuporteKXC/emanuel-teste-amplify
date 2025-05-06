import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import { OrderItemData } from '@/contracts';

const { Types, Creators } = createActions(
  {
    request: ['id','postData', 'onSuccess', 'onFailure'],
    success: [],
    failure: ['errorMessage'],
    reset: [],
  },
  {
    prefix: 'COMEX_UPDATE_ORDER_ITEM_',
  }
);

export interface UpdateOrderItemState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UpdateOrderItemRequestAction { 
    id: number;
  postData: Partial<OrderItemData> ;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface UpdateOrderItemFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UpdateOrderItemState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UpdateOrderItemState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: UpdateOrderItemState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (state: UpdateOrderItemState, action: UpdateOrderItemFailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const updateOrderItem = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateOrderItemTypes = Types;
export const UpdateOrderItemActions = Creators;
