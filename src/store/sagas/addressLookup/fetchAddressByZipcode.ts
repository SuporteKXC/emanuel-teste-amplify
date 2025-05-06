import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  FetchAddressByZipcodeActions as Actions,
  FetchAddressByZipcodeRequestAction as RequestAction,
} from 'store/ducks/addressLookup';

export function* fetchAddressByZipcodeRequest(action: any) {
  const { zipcode, onSuccess, onFailure }: RequestAction = action;
  try {
    const { data } = yield call(api.get, `address-lookup/${zipcode}`);
    onSuccess && onSuccess(data);
    yield put(Actions.success(data));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage));
  }
}
