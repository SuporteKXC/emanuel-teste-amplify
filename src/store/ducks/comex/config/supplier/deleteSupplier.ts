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
      prefix: 'DELETE_RESPONSIBLE_SUPPLIER_',
    }
  );

export const DeleteSupplierResponsibleTypes = Types;
export const DeleteSupplierResponsibleActions = Creators;

export interface DeleteSupplierResponsibleState {
  data: any | null;
  loading: boolean;
  error: string | null;
}
export interface DeleteSupplierResponsibleRequestAction {
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
const INITIAL_STATE: DeleteSupplierResponsibleState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state: DeleteSupplierResponsibleState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: DeleteSupplierResponsibleState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: DeleteSupplierResponsibleState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const deleteResponsibleSupplier = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: _request,
  [Types.SUCCESS]: _success,
  [Types.FAILURE]: _failure,
  [Types.RESET]: _reset,
});