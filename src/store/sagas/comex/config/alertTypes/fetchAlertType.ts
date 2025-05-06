import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  FetchAlertTypeRequestAction,
  FetchAlertTypeActions
} from 'store/ducks'

export function* fetchAlertTypeRequest(action: any) {
  const { id, onSuccess, onFailure }: FetchAlertTypeRequestAction = action;

  try {
    const { data } = yield call(api.get, `/alert-type/show/${id}`);

    onSuccess && onSuccess();
    yield all([
      put(FetchAlertTypeActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(FetchAlertTypeActions.failure(errorMessage));
  }
}
