import { call, put } from '@redux-saga/core/effects';
import { apiStocks, notify, apiErrorHandler } from 'services';
import {
  ApproveInvoiceJustificationActions as Actions,
  ApproveInvoiceJustificationRequestAction as RequestAction,
} from 'store/ducks/trackingDelivery/invoice-justifications';

export function* approveInvoiceJustificationRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiStocks.post, `/document-justifications/set-approved/${id}`);
    onSuccess && onSuccess();
    notify('success', 'Justificativa aprovada com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
