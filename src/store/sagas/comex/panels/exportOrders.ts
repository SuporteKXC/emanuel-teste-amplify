import { all, call, put } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler, applyQueryString } from "services";
import {
  ExportProductsRequestAction,
  ExportProductsActions,
} from "store/ducks/comex/panels/exportOrders";

export function* exportProductsListRequest(action: any) {
  const { params, onSuccess, onFailure }: ExportProductsRequestAction = action;

  try {
    let url = "/product/product-order-item";

    if (params) {
      url = applyQueryString(url, params);
    }

    const { data } = yield call(api.get, url);

    onSuccess && onSuccess(data);
    yield all([put(ExportProductsActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(ExportProductsActions.failure(errorMessage));
  }
}
