import { call, put } from '@redux-saga/core/effects';
import { apiImport, notify, apiErrorHandler } from 'services';
import {
  DeleteTrackingTransitTimeActions as Actions,
  DeleteTrackingTransitTimeRequestAction as RequestAction,
} from 'store/ducks/general';

export function* deleteTrackingTransitTimeRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiImport.delete, `transit-times/${id}`);
    onSuccess && onSuccess();
    notify('success', 'Transit Time excluído com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
