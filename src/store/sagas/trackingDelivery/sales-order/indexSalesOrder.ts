import { SalesOrder } from "@/contracts/salesOrder";
import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import {
  SalesOrderIndexActions as Actions,
  SalesOrderIndexRequestAction as RequestActions,
} from "store/ducks/trackingDelivery/sales-order";

export function* indexSalesOrderRequest(action: any) {
  const { query, statusFilter, onSuccess, onFailure }: RequestActions = action;

  try {
    const url = applyQueryString("sales-order", {
      ...query,
    });

    const { data } = yield call(apiStocks.get, url);

    if (statusFilter) {
      const filteredDocuments = data.filter((order: SalesOrder) =>
        statusFilter.includes(order.status)
      );

      data.splice(0, data.length, ...filteredDocuments);

    }

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
