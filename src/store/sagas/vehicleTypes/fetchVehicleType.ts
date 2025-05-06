import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  FetchVehicleTypeActions as Actions,
  FetchVehicleTypeRequestAction as RequestAction,
} from 'store/ducks/vehicleTypes';

export function* fetchVehicleTypeRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestAction = action;
  try {
    const { data } = yield call(api.get, `vehicle-types/${id}`);
    onSuccess && onSuccess();
    yield put(Actions.success(data));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage));
  }
}
