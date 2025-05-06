import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import { JustificationTypeRequestAction, JustificationTypeListActions } from 'store/ducks';

export function* listJustificationTypeRequest(action: any) {
  const { onSuccess, params, onFailure }: JustificationTypeRequestAction = action;

  try {
    const url = applyQueryString('/justification-type/index', {...params});
    const { data } = yield call(api.get, url);
    onSuccess && onSuccess(data);
    yield all([
      put(JustificationTypeListActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(JustificationTypeListActions.failure(errorMessage));
  }
}