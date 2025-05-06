import { all, call, put } from '@redux-saga/core/effects';
import { notify, apiErrorHandler, apiStocks } from 'services';
import { JustificationSnapshotTypeCreateActions, JustificationSnapshotTypeCreateRequestAction } from 'store/ducks/management/justificationSnapshotTypes';

export function* newJustificationSnapshotTypeRequest(action: any) {
    const { postData, onSuccess, onFailure }: JustificationSnapshotTypeCreateRequestAction = action;
    try {
      const { data } = yield call(apiStocks.post, `justification-snapshot-type/create`, postData);
      onSuccess && onSuccess(data.id);
      notify('success', 'Justificativa-Snapshot-Type Cadastrado!');
      yield all([
        put(JustificationSnapshotTypeCreateActions.success()),
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(JustificationSnapshotTypeCreateActions.failure(errorMessage));
    }
  }