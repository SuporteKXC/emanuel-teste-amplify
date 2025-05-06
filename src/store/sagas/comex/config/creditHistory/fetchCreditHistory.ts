import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  FetchCreditHistoryRequestAction,
  FetchCreditHistoryActions
} from 'store/ducks'

export function* fetchCreditHistoryRequest(action: any) {
  const { id, onSuccess, onFailure }: FetchCreditHistoryRequestAction = action;

  try {
    const { data } = yield call(api.get, `/alert-type/show/${id}`);

    onSuccess && onSuccess();
    yield all([
      put(FetchCreditHistoryActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(FetchCreditHistoryActions.failure(errorMessage));
  }
}
