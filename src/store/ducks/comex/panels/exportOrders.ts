import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { Pagination, ProductData } from "contracts";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'EXPORT_PRODUCTS_LIST',
    }
  );

export const ExportProductsListTypes = Types;
export const ExportProductsActions = Creators;

export interface ExportProductsState {
  data: ProductData[] | null;
  meta: Pagination | any;
  loading: boolean;
  error: string | null;
}

export interface ExportProductsRequestAction {
  params: any;
  error: string | null;
  onSuccess?: (data: ProductData[]) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ProductData[] | any;
  meta: Pagination;
  loading:boolean
}

interface FailureAction {
  error: string;
  loading:boolean;
}

const INITIAL_STATE: ExportProductsState = {
  data: null,
  meta: [],
  loading: false,
  error: null,
};

const _request = (state: ExportProductsState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ExportProductsState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data.data },
    meta: { $set: action.data.meta },
    // meta: { $set: action.meta },
  });

const _failure = (state: ExportProductsState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const exportProductsList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});