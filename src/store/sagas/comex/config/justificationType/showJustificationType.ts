import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  ShowJustificationTypeRequestAction,
  ShowJustificationTypeActions
} from 'store/ducks'

export function* showJustificationTypeRequest(action: any) {
  const { id, onSuccess, onFailure }: ShowJustificationTypeRequestAction = action;

  try {
    const { data } = yield call(api.get, `/justification-type/show/${id}`);

    onSuccess && onSuccess(data);
    yield all([
      put(ShowJustificationTypeActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(ShowJustificationTypeActions.failure(errorMessage));
  }
}