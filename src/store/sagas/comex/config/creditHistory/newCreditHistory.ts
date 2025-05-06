import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  NewCreditHistoryActions,
  NewCreditHistoryRequestAction
} from 'store/ducks';

export function* newCreditHistoryRequest(action: any) {
  const { postData, onSuccess, onFailure }: NewCreditHistoryRequestAction = action;
  try {
    const { data } = yield call(api.post, `/alert-type/create-related`, postData);
    onSuccess && onSuccess(data.id);
    notify('success', 'Histórico de crédito cadastrado!');
    yield all([
      put(NewCreditHistoryActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(NewCreditHistoryActions.failure(errorMessage));
  }
}
  