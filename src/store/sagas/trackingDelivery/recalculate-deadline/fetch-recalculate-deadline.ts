import { call, put } from '@redux-saga/core/effects';
import { apiImport, notify, apiErrorHandler } from 'services';
import {
  FetchRecalculateDeadlineActions as Actions,
  FetchRecalculateDeadlineRequestAction as RequestAction,
} from 'store/ducks/trackingDelivery/recalculate-deadline';

export function* fetchRecalculateDeadlineRequest(action: any) {
  const { putData, onSuccess, onFailure }: RequestAction = action;
  try {
    
    const { data } = yield call(apiImport.post, `transit-times/recalculate`, putData);
    const { deadlineDate } = data;
    onSuccess && onSuccess();
    yield put(Actions.success(deadlineDate));
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
