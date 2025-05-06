import { RootState } from '@/store';
import { all, call, put, select } from '@redux-saga/core/effects';
import { notify, apiErrorHandler, apiComexExport } from 'services';
import {
  NewExportOrderJustificationRequestAction,
  NewExportOrderJustificationActions
} from 'store/ducks/comex/operational'

const auth = (state: RootState) => state.auth;

export function* newExportOrderJustificationRequest(action: any) {
    const { postData, onSuccess, onFailure }: NewExportOrderJustificationRequestAction = action;
    try {
      const {
        data: { token },
      } = yield select(auth);

      apiComexExport.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = yield call(apiComexExport.post, `/export-justification/create`, postData);
      onSuccess && onSuccess(data.id);
      notify('success', 'Justificativa Cadastrada!');
      yield all([
        put(NewExportOrderJustificationActions.success()),
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(NewExportOrderJustificationActions.failure(errorMessage));
    }
  }