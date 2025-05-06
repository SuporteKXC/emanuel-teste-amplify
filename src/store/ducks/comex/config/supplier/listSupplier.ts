import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { SupplierData } from "@/contracts/comex/Supplier";

const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'LIST_SUPPLIER_',
    }
  );

export const SupplierListTypes = Types;
export const SupplierListActions = Creators;

export interface SupplierListState {
  data: any[] | null;
  loading: boolean;
  error: string | null;
}
export interface SupplierListRequestAction {
  params: any;
  error: string | null;
  onSuccess?: (data: any[]) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: any[];
  loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE:SupplierListState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state:SupplierListState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state:SupplierListState, action:SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state:SupplierListState, action:FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const supplierList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});