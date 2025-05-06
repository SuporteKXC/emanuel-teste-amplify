import { RootState } from '@/store';
import { all, call, put, select } from '@redux-saga/core/effects';
import { notify, apiErrorHandler, applyQueryString, apiComexExport } from 'services';
import {
  GetExportOrderJustificationRequestAction,
  GetExportOrderJustificationActions
} from 'store/ducks/comex/operational'

const auth = (state: RootState) => state.auth;

export function* getExportOrderJustificationRequest(action: any) {
  const { params, onSuccess, onFailure }: GetExportOrderJustificationRequestAction = action;

  try {
    const {
      data: { token },
    } = yield select(auth);
  
    const url = applyQueryString(`/export-justification/index`, params)
    apiComexExport.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const { data } = yield call(apiComexExport.get, url);
    onSuccess && onSuccess(data);
    yield all([
      put(GetExportOrderJustificationActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(GetExportOrderJustificationActions.failure(errorMessage));
  }
}