import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  FetchServiceTypeRequestAction,
  FetchServiceTypeActions
} from 'store/ducks/comex'

export function* fetchServiceTypeRequest(action: any) {
  const { id, onSuccess, onFailure }: FetchServiceTypeRequestAction = action;

  try {
    const { data } = yield call(api.get, `/service-type/show/${id}`);

    onSuccess && onSuccess();
    yield all([
      put(FetchServiceTypeActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(FetchServiceTypeActions.failure(errorMessage));
  }
}
