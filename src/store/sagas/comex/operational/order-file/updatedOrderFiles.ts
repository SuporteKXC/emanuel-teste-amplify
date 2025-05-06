import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import { UpdateOrderFileRequestAction, UpdateOrderFileActions } from '@/store/ducks';

export function* updateOrderFileRequest(action: any) {
    const { id ,postData, onSuccess, onFailure }: UpdateOrderFileRequestAction = action;
    try {
      const { data } = yield call(api.put, `/order-files/update`, postData);
      onSuccess && onSuccess();
      notify('success', 'Documento atualizdo!');
      yield all([
        put(UpdateOrderFileActions.success()),
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(UpdateOrderFileActions.failure(errorMessage));
    }
  }