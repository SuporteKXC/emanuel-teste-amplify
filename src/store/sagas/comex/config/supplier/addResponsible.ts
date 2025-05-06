import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  NewUserSupplierActions,
  NewUserSupplierRequestAction,
} from 'store/ducks';

export function* newUserSupplierRequest(action: any) {
    const { postData, onSuccess, onFailure }: NewUserSupplierRequestAction = action;
    try {
      console.log("postData",postData)
      const { data } = yield call(api.post, `/user-supplier/add-user/`, postData);
      onSuccess && onSuccess(data);
      notify('success', 'Fornecedor Cadastrado!');
      yield all([
        put(NewUserSupplierActions.success()),
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(NewUserSupplierActions.failure(errorMessage));
    }
  }
  