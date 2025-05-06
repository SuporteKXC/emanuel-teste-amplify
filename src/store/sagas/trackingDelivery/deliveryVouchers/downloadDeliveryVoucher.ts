import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import {
  DeliveryVoucherDownloadActions as Actions,
  DeliveryVoucherDownloadRequestAction as RequestActions,
} from "store/ducks/trackingDelivery/delivery-vouchers";

export function* downloadDeliveryVoucherRequest(action: any) {
  const { query, callBack }: RequestActions = action;

  try {
    const urlResult = applyQueryString(
      "delivery-voucher/download",
      query || {}
    );
    const { data } = yield call(apiStocks.get, urlResult);
    console.log(urlResult);

    const response: Response = yield call(fetch, data.urlSigned);

    const imageBuffer: ArrayBuffer = yield call([response, "arrayBuffer"]);

    const blob = new Blob([imageBuffer], { type: data.type || "image/jpeg" });
    const imageUrl = URL.createObjectURL(blob);

    callBack.onSuccess && callBack.onSuccess(data);

    yield all([put(Actions.success(imageUrl))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    callBack.onFailure && callBack.onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(Actions.failure(errorMessage));
  }
}
