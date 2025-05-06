import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";


const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['data'],
      failure: ['error'],
      reset: [],
    },
    {
      prefix: 'LIST_USER_SUPPLIER_',
    }
  );

export const UserSupplierListTypes = Types;
export const UserSupplierListActions = Creators;

export interface UserSupplierListState {
  data: any[] | null;
  loading: boolean;
  error: string | null;
}
export interface UserSupplierListRequestAction {
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
const INITIAL_STATE: UserSupplierListState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: UserSupplierListState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: UserSupplierListState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: UserSupplierListState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const userSupplierList = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});