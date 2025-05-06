
import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  UpdateExportOrderItemAlertRequestAction,
  UpdateExportOrderItemAlertActions
} from 'store/ducks/comex/exportAlert';

export function* updateExportOrderItemAlertRequest(action: any) {
  const { id, read, onSuccess, onFailure }: UpdateExportOrderItemAlertRequestAction = action;
  
  try {
    const { data } = yield call(api.put, `/user-export-order-item-alert/update/${id}`, {
      read
    });
    onSuccess && onSuccess();
    notify('success', 'Alerta atualizado!');
    yield all([
      put(UpdateExportOrderItemAlertActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(UpdateExportOrderItemAlertActions.failure(errorMessage));
  }
}
