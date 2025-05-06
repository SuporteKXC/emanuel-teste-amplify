import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks } from "services";
import {
  SalesOrderShowActions as Actions,
  SalesOrderShowRequestAction as RequestActions,
} from "store/ducks/trackingDelivery/sales-order";

export function* showSalesOrderRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestActions = action;

  try {
    const url = `sales-order/${id}`;

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
