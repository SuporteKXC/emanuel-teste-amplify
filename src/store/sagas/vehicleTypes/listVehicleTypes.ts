import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  ListVehicleTypesActions as Actions,
  ListVehicleTypesRequestAction as RequestAction,
} from 'store/ducks/vehicleTypes';

export function* listVehicleTypesRequest(action: any) {
  const { query = {}, onSuccess, onFailure }: RequestAction = action;
  try {
    const url = applyQueryString('vehicle-types', {
      ...query,
      asList: 1,
      orderBy: 'name',
      direction: 'asc',
    });
    const { data } = yield call(api.get, url);
    onSuccess && onSuccess();
    yield put(Actions.success(data));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage));
  }
}
