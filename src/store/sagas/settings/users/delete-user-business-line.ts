import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { requestErrorHandler } from "utils";
import {
  DeleteUserBusinessLineActions,
  DeleteUserBusinessLineRequest,
} from "store/ducks/settings/users";

export function* deleteUserBusinessLineRequest(action: any) {
  try {
    const {
      userId,
      businessLineId,
      onSuccess,
    } = action as DeleteUserBusinessLineRequest;

    const { data: responseBody } = yield call(
      apiGeneral.delete,
      `/user-business-lines/${userId}/${businessLineId}`
    );

    const { data } = responseBody;
    yield put(DeleteUserBusinessLineActions.success(data));
    notify("success", "Centro removido com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeleteUserBusinessLineActions.failure(errorMessage));
  }
}
