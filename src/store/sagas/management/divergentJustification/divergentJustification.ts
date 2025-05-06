import { all, call, put } from '@redux-saga/core/effects';
import { notify, apiErrorHandler, apiStocks } from 'services';
import { DivergentJustificationCreateActions, DivergentJustificationCreateRequestAction } from 'store/ducks/management/divergentJustification';

export function* createDivergentJustificationRequest(action: any) {
  const { postData, onSuccess, onFailure }: DivergentJustificationCreateRequestAction = action;
  try {
    const { data } = yield call(apiStocks.post, `divergent-justification/create`, postData);
    onSuccess && onSuccess(data);
    notify('success', 'Snapshot-Divergent-Justification Cadastrado!');
    yield all([
      put(DivergentJustificationCreateActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(DivergentJustificationCreateActions.failure(errorMessage));
  }
}