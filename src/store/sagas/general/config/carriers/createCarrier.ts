import { call, put } from '@redux-saga/core/effects';
import { apiStocks, notify, apiErrorHandler } from 'services';
import {
  CreateCarrierActions as Actions,
  CreateCarrierRequestAction as RequestAction,
} from 'store/ducks/general';

export function* createCarrierRequest(action: any) {
  const { postData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiStocks.post, `carriers`, postData);
    onSuccess && onSuccess();
    notify('success', 'Transportadora criada com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    if(validationErrors && validationErrors.length >= 1){
      notify('error', errorMessage + ". " + validationErrors[0].message);
    } else {
      notify('error', errorMessage);
    }
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
