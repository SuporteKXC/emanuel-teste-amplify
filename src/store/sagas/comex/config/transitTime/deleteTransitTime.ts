import { all, call, put } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler } from "services";
import {
  DeleteTransitTimeActions,
  DeleteTransitTimeRequestAction,
} from "store/ducks";

export function* deleteTransitTimeRequest(action: any) {
  const { id, onSuccess, onFailure }: DeleteTransitTimeRequestAction = action;
  try {
    const { data } = yield call(api.delete, `/transit-time/delete/${id}`);
    onSuccess && onSuccess();
    notify("success", "Transit Time deletado!");
    yield all([put(DeleteTransitTimeActions.success())]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(DeleteTransitTimeActions.failure(errorMessage));
  }
}
