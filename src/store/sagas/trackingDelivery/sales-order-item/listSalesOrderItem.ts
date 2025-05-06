import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import {
  SalesOrderItemListActions as Actions,
  SalesOrderItemListRequestAction as RequestActions,
} from "store/ducks/trackingDelivery/sales-order-item";

export function* listSalesOrderItemRequest(action: any) {
  const { query, onSuccess, onFailure }: RequestActions = action;

  try {
    const url = applyQueryString("sales-order-item/list", {
      ...query,
    });

    const { data } = yield call(apiStocks.get, url);

    onSuccess && onSuccess(data);

    yield all([put(Actions.success(data))]);
  } catch (error: any) {
    const { errorMessage } = apiErrorHandler(error);
    notify("error", errorMessage);
    if(error?.response.status === 403) {
      onFailure && onFailure();
    }
    yield put(Actions.failure(errorMessage));
  }
}
