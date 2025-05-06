import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  NewSupplierActions,
  NewSupplierRequestAction,
} from 'store/ducks';

export function* newSupplierRequest(action: any) {
    const { postData, onSuccess, onFailure }: NewSupplierRequestAction = action;
    try {
      console.log(postData)
      postData.user = postData?.user?.map((item) => { return {user_id: item.user_id, expired_at: item.expired_at} })
      const { data } = yield call(api.post, `/supplier/create`, postData);
      onSuccess && onSuccess(data.id);
      notify('success', 'Fornecedor Cadastrado!');
      yield all([
        put(NewSupplierActions.success()),
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(NewSupplierActions.failure(errorMessage));
    }
  }
  