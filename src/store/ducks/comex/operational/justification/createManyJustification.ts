import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

interface IRequest {
  justification_type_id: string;
  description: string;
  order_item_ids: string[];
}
const { Types, Creators } = createActions(
  {
    request: ["postData", "onSuccess", "onFailure"],
    success: [],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "ORDER_ITEM_JUSTIFICATIONS_MANY_",
  }
);

export const OrderItemJustificationManyTypes = Types;
export const OrderItemJustificationManyActions = Creators;

export interface OrderItemJustificationManyState {
  loading: boolean;
  error: string | null;
}
export interface OrderItemJustificationManyRequestAction {
  postData: IRequest;
  error: string | null;
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface FailureAction {
  error: string;
}
const INITIAL_STATE: OrderItemJustificationManyState = {
  loading: false,
  error: null,
};

const _request = (state: OrderItemJustificationManyState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: OrderItemJustificationManyState) =>
  update(state, {
    loading: { $set: false },
  });

const _failure = (
  state: OrderItemJustificationManyState,
  action: FailureAction
) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const orderItemJustificationMany = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});
