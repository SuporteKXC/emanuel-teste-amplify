import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  CarrierRequestAction,
  CarrierActions
} from 'store/ducks'

export function* carrierRequest(action: any) {
    const { onSuccess, onFailure }: CarrierRequestAction = action;

    try {
      const { data } = yield call(api.get, `/carrier/index`);

      onSuccess && onSuccess(data);
      yield all([
        put(CarrierActions.success(data))
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(CarrierActions.failure(errorMessage));
    }
  }