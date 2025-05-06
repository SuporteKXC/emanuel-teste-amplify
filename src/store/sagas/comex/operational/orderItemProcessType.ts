import { all, call, put } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler } from "services";
import {
  orderItemProcessTypesRequestAction,
  OrderItemProcessTypesActions
} from "store/ducks/comex/operational";

export function* orderItemProcessTypesRequest(action: any) {
  const { onSuccess, onFailure }: orderItemProcessTypesRequestAction = action;

  try {
    let url = "/order-item/getProcessTypes";

    const { data } = yield call(api.get, url);

    const dateForm = data.map((element: any) => {
      return {
        value: element.process_type,
        label: element.process_type,
      };
    });

    onSuccess && onSuccess();
    yield all([put(OrderItemProcessTypesActions.success(dateForm))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(OrderItemProcessTypesActions.failure(errorMessage));
  }
}
