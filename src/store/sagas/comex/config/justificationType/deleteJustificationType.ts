import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  DeleteJustificationTypeActions,
  DeleteJustificationTypeRequestAction
} from 'store/ducks';

export function* deleteJustificationTypeRequest(action: any) {
  const { id, onSuccess, onFailure }: DeleteJustificationTypeRequestAction = action;
  try {
    const { data } = yield call(api.delete, `/justification-type/delete/${id}`);
    onSuccess && onSuccess();
    notify('success', 'Tipo de Justificativa Deletada!');
    yield all([
      put(DeleteJustificationTypeActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(DeleteJustificationTypeActions.failure(errorMessage));
  }
}
