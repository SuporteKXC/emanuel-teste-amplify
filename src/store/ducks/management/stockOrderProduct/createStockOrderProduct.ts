import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { StockOrderProductCreateData } from "contracts/management";

const { Types, Creators } = createActions(
    {
      request: ['postData','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'STOCK_ORDER_PRODUCT_NEW',
    }
  );

export const StockOrderProductCreateTypes = Types;
export const StockOrderProductCreateActions = Creators;

export interface StockOrderProductState {
    data: StockOrderProductCreateData
    loading: boolean;
    error: string | null;
  }
export interface StockOrderProductCreateRequestAction {
    postData: any;
    error: string | null;
    onSuccess?: (data: StockOrderProductCreateData) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
  data: StockOrderProductCreateData;
}
interface FailureAction {
  error: string;
}
const INITIAL_STATE:StockOrderProductState = {
  data: {
      productId: "",
      orderId: "",
      complaintId: null
  },
  loading: false,
  error: null,
};

const _request = (state:StockOrderProductState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: StockOrderProductState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: StockOrderProductState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const stockOrderProductCreate = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });