import { RootState } from "@/store";
import { all, call, put, select } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiUploadVoucher } from "services";
import {
  DeliveryVoucherCreateActions as Actions,
  DeliveryVoucherCreateRequestAction as RequestActions,
} from "store/ducks/trackingDelivery/delivery-vouchers";

const auth = (state: RootState) => state.auth;

export function* createDeliveryVoucherRequest(action: any) {
  const { payload, callBack }: RequestActions = action;

  try {

    const {
      data: { token },
    } = yield select(auth);
    apiUploadVoucher.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const url = `upload-canhoto`;
    const { data } = yield call(apiUploadVoucher.post, url, payload);

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
