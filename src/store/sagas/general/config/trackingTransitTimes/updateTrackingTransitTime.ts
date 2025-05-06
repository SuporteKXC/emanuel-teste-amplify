import { call, put } from '@redux-saga/core/effects';
import { apiImport, notify, apiErrorHandler } from 'services';
import {
  UpdateTrackingTransitTimeActions as Actions,
  UpdateTrackingTransitTimeRequestAction as RequestAction,
} from 'store/ducks/general';

export function* updateTrackingTransitTimeRequest(action: any) {
  const { id, putData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiImport.put, `transit-times/${id}`, putData);
    onSuccess && onSuccess();
    notify('success', 'Transit Time atualizado com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
