import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";


const { Types, Creators } = createActions(
    {
      request: ['id','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'LIST_RESPONSIBLE_SUPPLIER_',
    }
  );

export const ResponsibleSupplierListTypes = Types;
export const ResponsibleSupplierListActions = Creators;

export interface ResponsibleSupplierListState {
  data: any | null;
  loading: boolean;
  error: string | null;
}
export interface ResponsibleSupplierListRequestAction {
  id: any;
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
const INITIAL_STATE: ResponsibleSupplierListState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: ResponsibleSupplierListState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: ResponsibleSupplierListState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: ResponsibleSupplierListState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const responsibleSupplierList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});