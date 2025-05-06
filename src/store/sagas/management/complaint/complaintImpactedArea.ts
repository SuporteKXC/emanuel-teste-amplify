import { all, call, put } from '@redux-saga/core/effects';
import { notify, apiErrorHandler, apiStocks } from 'services';
import { ComplaintImpactedAreaActions } from 'store/ducks/management/complaint/complaintImpactedArea';

export function* complaintImpactedAreaRequest(action: any) {

  try {
    const { data } = yield call(apiStocks.get, `complaint-impacted-area`);
    yield all([
      put(ComplaintImpactedAreaActions.success(data)),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    notify('error', errorMessage);
    yield put(ComplaintImpactedAreaActions.failure(errorMessage));
  }
}