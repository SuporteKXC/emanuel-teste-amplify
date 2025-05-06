import { call, put } from '@redux-saga/core/effects';
import { apiImport, notify, apiErrorHandler } from 'services';
import {
  CreateTrackingTransitTimeActions as Actions,
  CreateTrackingTransitTimeRequestAction as RequestAction,
} from 'store/ducks/general';

export function* createTrackingTransitTimeRequest(action: any) {
  const { postData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiImport.post, `transit-times`, postData);
    onSuccess && onSuccess();
    notify('success', 'Transit Time criado com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}


/////////RESOLVER ERRO NETWORK LISTAGEM DO TRANSIT TIME