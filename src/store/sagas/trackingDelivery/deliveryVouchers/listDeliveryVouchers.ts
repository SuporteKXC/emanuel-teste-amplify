import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import {
  DeliveryVouchersListActions as Actions,
  DeliveryVouchersListRequestAction as RequestActions,
} from "store/ducks/trackingDelivery/delivery-vouchers";

export function* listDeliveryVouchersRequest(action: any) {
  const { query, onSuccess, onFailure }: RequestActions = action;

  try {
    const url = applyQueryString("delivery-voucher", {
      ...query,
      asList: 1,
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
