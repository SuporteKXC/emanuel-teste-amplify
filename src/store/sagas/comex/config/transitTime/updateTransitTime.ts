import { all, call, put } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler } from "services";
import {
  UpdateTransitTimeActions,
  UpdateTransitTimeRequestAction,
} from "store/ducks";

export function* updatTransitTimeRequest(action: any) {
  const { id, postData, onSuccess, onFailure }: UpdateTransitTimeRequestAction =
    action;
  try {
    const { data } = yield call(
      api.put,
      `/transit-time/update/${id}`,
      postData
    );
    onSuccess && onSuccess();
    notify("success", "Transit Time Atualizado!");
    yield all([put(UpdateTransitTimeActions.success())]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(UpdateTransitTimeActions.failure(errorMessage));
  }
}
