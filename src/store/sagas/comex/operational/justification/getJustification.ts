import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  GetJustificationRequestAction,
  GetJustificationActions
} from 'store/ducks/comex/operational'

export function* getJustificationRequest(action: any) {
  const { params, onSuccess, onFailure }: GetJustificationRequestAction = action;

  try {
    const url = applyQueryString(`/justification/index`, params)
    const { data } = yield call(api.get, url);
    onSuccess && onSuccess(data);
    yield all([
      put(GetJustificationActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(GetJustificationActions.failure(errorMessage));
  }
}