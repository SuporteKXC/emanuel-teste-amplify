import { call, put } from '@redux-saga/core/effects';
import { apiStocks, notify, apiErrorHandler } from 'services';
import {
  UpdateStatusJustificationSalesActions as Actions,
  UpdateStatusJustificationSalesRequestAction as RequestAction,
} from 'store/ducks/trackingDelivery/justification-sales';

export function* updateStatusJustificationSalesRequest(action: any) {
  const { statusData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiStocks.put, `/justification-sales/update-in`, statusData);
    
    onSuccess && onSuccess();

    notify('success', 'Justificativa atualizada com sucesso');

    yield put(Actions.success());

  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
