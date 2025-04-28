import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { ListProductCompaniesActions } from "store/ducks/settings/product-companies";

export function* listProductCompaniesRequest(action: any) {
  try {
    const { id, onSuccess } = action as IListRequest;
    const { data } = yield call(apiGeneral.get, `/product-companies?product_id=${id}`);
    yield put(ListProductCompaniesActions.success(data));
    if (onSuccess) onSuccess(data);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListProductCompaniesActions.failure(errorMessage));
  }
}
