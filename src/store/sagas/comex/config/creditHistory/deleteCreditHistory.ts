import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
    DeleteCreditHistoryActions,
    DeleteCreditHistoryRequestAction,
} from 'store/ducks';

export function* deleteCreditHistoryRequest(action: any) {
  const { id, onSuccess, onFailure }: DeleteCreditHistoryRequestAction = action;
  try {
    const { data } = yield call(api.delete, `/alert-type/delete/${id}`);
    onSuccess && onSuccess();
    notify('success', 'Histórico de crédito deletado!');
    yield all([
      put(DeleteCreditHistoryActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(DeleteCreditHistoryActions.failure(errorMessage));
  }
}