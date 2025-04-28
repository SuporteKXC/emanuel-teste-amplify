import { call, put } from "redux-saga/effects";
import { apiGeneral, notify, queryBuilder } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { ListStockProductsActions } from "store/ducks/settings/products";

import { Product } from "interfaces/product";

export function* listStockProductsRequest(action: any) {
    try {
        const { query = {}, onSuccess } = action as IListRequest;
        const queryString = queryBuilder(query);
        const { data } = yield call(apiGeneral.get, `/stockProducts?${queryString}`);
        const comboOptions = data.map((unit: Product) => ({
            value: unit.id,
            label: unit.description,
        }));

        yield put(ListStockProductsActions.success(comboOptions));
        if (onSuccess) onSuccess(comboOptions);
    } catch (error) {
        const { errorMessage } = requestErrorHandler(error);
        notify("error", errorMessage);
        yield put(ListStockProductsActions.failure(errorMessage));
    }
}
