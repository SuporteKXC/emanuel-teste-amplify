import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { ListProductExceptionActions } from "store/ducks/settings/product-exceptions";

export function* listProductExceptionRequest(action: any) {
  try {
    const { id, onSuccess } = action as IListRequest;
    const { data } = yield call(apiGeneral.get, `/product-exceptions?product_type_id=${id}`);
    yield put(ListProductExceptionActions.success(data));
    if (onSuccess) onSuccess(data);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListProductExceptionActions.failure(errorMessage));
  }
}
