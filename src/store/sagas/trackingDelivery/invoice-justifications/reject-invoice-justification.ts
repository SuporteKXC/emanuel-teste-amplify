import { call, put } from '@redux-saga/core/effects';
import { apiStocks, notify, apiErrorHandler } from 'services';
import {
  RejectInvoiceJustificationActions as Actions,
  RejectInvoiceJustificationRequestAction as RequestAction,
} from 'store/ducks/trackingDelivery/invoice-justifications';

export function* rejectInvoiceJustificationRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiStocks.post, `/document-justifications/set-rejected/${id}`);
    onSuccess && onSuccess();
    notify('success', 'Justificativa reprovada com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
