import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import {
  DeliveryVoucherRejectActions as Actions,
  DeliveryVoucherRejectRequestAction as RequestActions,
} from "store/ducks/trackingDelivery/delivery-vouchers";

export function* rejectDeliveryVoucherRequest(action: any) {
  const { query, callBack }: RequestActions = action;

  try {
    const url = applyQueryString(
      `delivery-voucher/set-as-rejected`,
      query || {}
    );
    const { data } = yield call(apiStocks.get, url);

    callBack.onSuccess && callBack.onSuccess(data);

    yield all([put(Actions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    callBack.onFailure && callBack.onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(Actions.failure(errorMessage));
  }
}
