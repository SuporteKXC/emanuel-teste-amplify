import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  UpdateSupplierActions,
  UpdateSupplierRequestAction,
} from 'store/ducks';

export function* updateSupplierRequest(action: any) {
    const { postData,id, onSuccess, onFailure }: UpdateSupplierRequestAction = action;
    try {
      const { data } = yield call(api.put, `/supplier/update/${id}`, postData);
      onSuccess && onSuccess(data.id);
      notify('success', 'Fornecedor Cadastrado!');
      yield all([
        put(UpdateSupplierActions.success()),
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log("ERRORSAGA")
      console.log(error)
      yield put(UpdateSupplierActions.failure(errorMessage));
    }
  }
  