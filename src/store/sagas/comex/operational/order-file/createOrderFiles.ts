import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import { CreateOrderFileRequestAction, CreateOrderFileActions } from '@/store/ducks';

export function* createOrderFileRequest(action: any) {
    const { postData, onSuccess, onFailure }: CreateOrderFileRequestAction = action;
    try {
      const { data } = yield call(api.post, `/order-files`, postData);
      onSuccess && onSuccess(data);
      notify('success', 'Documento Cadastrado!');
      yield all([
        put(CreateOrderFileActions.success()),
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(CreateOrderFileActions.failure(errorMessage));
    }
  }