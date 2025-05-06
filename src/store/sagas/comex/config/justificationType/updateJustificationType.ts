import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  UpdateJustificationTypeActions,
  UpdateJustificationTypeRequestAction
} from 'store/ducks';

export function* updateJustificationTypeRequest(action: any) {
  const { id, postData, onSuccess, onFailure }: UpdateJustificationTypeRequestAction = action;
  try {
    const { data } = yield call(api.put, `/justification-type/update/${id}`, postData);
    onSuccess && onSuccess();
    notify('success', 'Tipo de Justificativa Atualizada!');
    yield all([
      put(UpdateJustificationTypeActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(UpdateJustificationTypeActions.failure(errorMessage));
  }
}