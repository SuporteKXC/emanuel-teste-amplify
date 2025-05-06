import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  CreateUserSupplierActions,
  CreateUserSupplierRequestAction,
} from 'store/ducks';

export function* createUserSupplierRequest(action: any) {
  const { postData, onSuccess, onFailure }: CreateUserSupplierRequestAction = action;
  try {
    console.log("postData", postData)
    const { data } = yield call(api.post, `/user-supplier/create/`, postData);
    onSuccess && onSuccess(data);
    notify('success', 'Responsavel do Fornecedor Cadastrado!');
    yield all([
      put(CreateUserSupplierActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(CreateUserSupplierActions.failure(errorMessage));
  }
}