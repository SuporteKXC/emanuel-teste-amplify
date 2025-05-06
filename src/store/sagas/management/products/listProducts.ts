import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import {
  ProductsListActions,
  ProductsListRequestAction,
} from "store/ducks/management/products";

export function* listProductsRequest(action: any) {
  const { query, onSuccess, onFailure }: ProductsListRequestAction = action;

  try {
    const url = applyQueryString("products", {
      ...query,
    });

    const { data } = yield call(apiStocks.get, url);
    
    onSuccess && onSuccess(data);
    yield all([put(ProductsListActions.success(data, data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(ProductsListActions.failure(errorMessage));
  }
}
