import { all, call, put } from '@redux-saga/core/effects';
import { notify, apiErrorHandler, apiStocks } from 'services';
import { ComplaintUpdateMovementActions, ComplaintUpdateMovementRequestAction } from 'store/ducks/management/complaint';

export function* complaintUpdateMovementRequest(action: any) {
  const {id, postData, onSuccess, onFailure }: ComplaintUpdateMovementRequestAction = action;
  try {
    const { data } = yield call(apiStocks.put, `stock-movements-snapshot/update/${id}`, postData);
    onSuccess && onSuccess(data);
    notify('success', 'Divergência atualizada!');
    yield all([
      put(ComplaintUpdateMovementActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(ComplaintUpdateMovementActions.failure(errorMessage));
  }
}