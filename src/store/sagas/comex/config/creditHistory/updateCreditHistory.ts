import { all, call, put } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler } from "services";
import {
  UpdateCreditHistoryActions,
  UpdateCreditHistoryRequestAction,
} from "store/ducks";

export function* updateCreditHistoryRequest(action: any) {
  const { id, postData, onSuccess, onFailure }: UpdateCreditHistoryRequestAction =
    action;
  try {
    console.log(postData, "post data");
    const { data } = yield call(
      api.put,
      `/alert-type/update-related/${id}`,
      postData
    );
    onSuccess && onSuccess();
    notify("success", "Histórico de crédito atualizado!");
    yield all([put(UpdateCreditHistoryActions.success())]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(UpdateCreditHistoryActions.failure(errorMessage));
  }
}
