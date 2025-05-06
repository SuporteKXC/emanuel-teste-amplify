import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  NewAlertTypeActions,
  NewAlertTypeRequestAction
} from 'store/ducks';

export function* newAlertTypeRequest(action: any) {
  const { postData, onSuccess, onFailure }: NewAlertTypeRequestAction = action;
  try {
    const { data } = yield call(api.post, `/alert-type/create-related`, postData);
    onSuccess && onSuccess(data.id);
    notify('success', 'Tipo de alerta cadastrado!');
    yield all([
      put(NewAlertTypeActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(NewAlertTypeActions.failure(errorMessage));
  }
}
  