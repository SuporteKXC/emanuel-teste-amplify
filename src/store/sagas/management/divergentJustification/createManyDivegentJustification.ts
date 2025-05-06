import { all, call, put } from '@redux-saga/core/effects';
import { notify, apiErrorHandler, apiStocks } from 'services';
import { DivergentJustificationCreateManyActions, DivergentJustificationCreateManyRequestAction } from 'store/ducks/management/divergentJustification';

export function* createManyDivergentJustificationRequest(action: any) {
  const { postData, onSuccess, onFailure }: DivergentJustificationCreateManyRequestAction = action;
  try {
    const { data } = yield call(apiStocks.post, `divergent-justification/create-many`, postData);
    onSuccess && onSuccess(data);
    notify('success', 'Justificativa Cadastrada!');
    yield all([
      put(DivergentJustificationCreateManyActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(DivergentJustificationCreateManyActions.failure(errorMessage));
  }
}