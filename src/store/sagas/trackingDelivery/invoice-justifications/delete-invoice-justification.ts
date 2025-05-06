import { call, put } from '@redux-saga/core/effects';
import { apiStocks, notify, apiErrorHandler } from 'services';
import {
  DeleteInvoiceJustificationActions as Actions,
  DeleteInvoiceJustificationRequestAction as RequestAction,
} from 'store/ducks/trackingDelivery/invoice-justifications';

export function* deleteInvoiceJustificationRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiStocks.delete, `/document-justifications/delete/${id}`);
    onSuccess && onSuccess();
    notify('success', 'Justificativa removida com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
