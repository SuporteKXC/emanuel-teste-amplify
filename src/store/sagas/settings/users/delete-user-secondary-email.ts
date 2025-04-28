import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { requestErrorHandler } from "utils";
import {
  DeleteUserSecondaryEmailActions,
  DeleteUserSecondaryEmailRequest,
} from "store/ducks/settings/users";

export function* deleteUserSecondaryEmailRequest(action: any) {
  try {
    const {
      emailID,
      onSuccess,
    } = action as DeleteUserSecondaryEmailRequest;

    const { data: responseBody } = yield call(
      apiGeneral.delete,
      `/user-email-secondary/${emailID}`
    );

    const { data } = responseBody;
    yield put(DeleteUserSecondaryEmailActions.success(data));
    notify("success", "E-mail removido com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeleteUserSecondaryEmailActions.failure(errorMessage));
  }
}
