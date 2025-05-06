import { all, call, put } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler } from "services";
import {
  orderItemStatusRequestAction,
  OrderItemStatusActions,
} from "store/ducks/comex/operational";

export function* orderItemStatusRequest(action: any) {
  const { onSuccess, onFailure }: orderItemStatusRequestAction = action;

  try {
    let url = "/order-item/getProcessStatus";

    const { data } = yield call(api.get, url);

    const dateForm = data.map((el: any) => {
      return {
        value: el.process_status,
        label: el.process_status,
      };
    });

    onSuccess && onSuccess();
    yield all([put(OrderItemStatusActions.success(dateForm))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(OrderItemStatusActions.failure(errorMessage));
  }
}
