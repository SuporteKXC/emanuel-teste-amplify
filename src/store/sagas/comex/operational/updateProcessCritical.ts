import { call, put } from "@redux-saga/core/effects";
import { api, apiErrorHandler, notify } from "services";
import { UpdateProcessCriticalActions, UpdateProcessCriticalRequestAction } from "store/ducks/comex/operational/updateProcessCritical";

export function* updateProcessCritical(action: any) {
  const { postData, onSuccess, onFailure }: UpdateProcessCriticalRequestAction = action;

  try {
    const url = "order-item/update-process-critical";

    const { data } = yield call(api.put, url, postData);

    notify("success", data.message);
    onSuccess && onSuccess();

    yield put(UpdateProcessCriticalActions.success());
  } catch (error) {
    console.log(error)
    const { errorMessage } = apiErrorHandler(error);

    onFailure && onFailure();

    notify("error", errorMessage);

    yield put(UpdateProcessCriticalActions.failure(errorMessage));
  }
}