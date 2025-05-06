import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  JustificationRequestAction,
  JustificationListActions
} from 'store/ducks/comex/operational'

export function* listJustificationRequest(action: any) {
  const { onSuccess, onFailure }: JustificationRequestAction = action;

  try {
    const { data } = yield call(api.get, "/justification/index");
    onSuccess && onSuccess(data);
    yield all([
      put(JustificationListActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(JustificationListActions.failure(errorMessage));
  }
}