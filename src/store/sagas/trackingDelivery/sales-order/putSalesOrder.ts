import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks } from "services";
import {
  SalesOrderPutActions as Actions,
  SalesOrderPutRequestAction as RequestActions,
} from "store/ducks/trackingDelivery/sales-order";

export function* putSalesOrderRequest(action: any) {
  const { id, data: putData, onSuccess, onFailure }: RequestActions = action;

  try {
    const url = `sales-order/update-delivery-document-number/${id}`;

    const { data } = yield call(apiStocks.put, url,putData);

    onSuccess && onSuccess(data);

    notify('success', "Documento adicionado com sucesso!")

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
