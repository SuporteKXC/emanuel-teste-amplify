import { call, put } from '@redux-saga/core/effects';
import { apiStocks, notify, apiErrorHandler } from 'services';
import {
  UpdateDocumentCarrierActions as Actions,
  UpdateDocumentCarrierRequestAction as RequestAction,
} from 'store/ducks/trackingDelivery/carriers';

export function* updateDocumentCarrierRequest(action: any) {
  const { putData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiStocks.post, `documents/carrier`, putData);
    onSuccess && onSuccess();
    notify('success', 'Transportadora alterada com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
