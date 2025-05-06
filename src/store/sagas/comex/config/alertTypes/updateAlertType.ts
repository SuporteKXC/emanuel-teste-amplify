import { all, call, put } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler } from "services";
import {
  UpdateAlertTypeActions,
  UpdateAlertTypeRequestAction,
} from "store/ducks";

export function* updateAlertTypeRequest(action: any) {
  const { id, postData, onSuccess, onFailure }: UpdateAlertTypeRequestAction =
    action;
  try {
    const { data } = yield call(
      api.put,
      `/alert-type/update-related/${id}`,
      postData
    );
    onSuccess && onSuccess();
    notify("success", "Tipo de alerta atualizado!");
    yield all([put(UpdateAlertTypeActions.success())]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(UpdateAlertTypeActions.failure(errorMessage));
  }
}
