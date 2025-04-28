import { call, put } from "redux-saga/effects";
import { apiGeneral, notify, queryBuilder } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { ListProductsActions } from "store/ducks/settings/products";

import { Product } from "interfaces/product";

export function* listProductsRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IListRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(apiGeneral.get, `/products?${queryString}`);
    const comboOptions = data.map((unit: Product) => ({
      value: unit.id,
      label: unit.description,
    }));

    yield put(ListProductsActions.success(comboOptions));
    if (onSuccess) onSuccess(comboOptions);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListProductsActions.failure(errorMessage));
  }
}
