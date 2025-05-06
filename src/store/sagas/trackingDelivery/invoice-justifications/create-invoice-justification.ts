import { call, put } from '@redux-saga/core/effects';
import { apiStocks, notify, apiErrorHandler } from 'services';
import {
  CreateInvoiceJustificationActions as Actions,
  CreateInvoiceJustificationRequestAction as RequestAction,
} from 'store/ducks/trackingDelivery/invoice-justifications';

export function* createInvoiceJustificationRequest(action: any) {
  const { postData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiStocks.post, `/document-justifications/create`, postData);
    onSuccess && onSuccess();
    notify('success', 'Justificativa criada com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
