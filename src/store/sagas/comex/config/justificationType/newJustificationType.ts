import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import { NewJustificationTypeRequestAction, NewJustificationTypesActions } from 'store/ducks';

export function* newJustificationTypeRequest(action: any) {
  const { postData, onSuccess, onFailure }: NewJustificationTypeRequestAction = action;
  try {
    const { data } = yield call(api.post, `/justification-type/create`, postData);
    onSuccess && onSuccess(data.id);
    notify('success', 'Tipo de Justificativa Cadastrada!');
    yield all([
      put(NewJustificationTypesActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(NewJustificationTypesActions.failure(errorMessage));
  }
}