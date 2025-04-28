import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { requestErrorHandler } from "utils";
import {
  DeleteUserCompanyActions,
  DeleteUserCompanyRequest,
} from "store/ducks/settings/users";

export function* deleteUserCompanyRequest(action: any) {
  try {
    const { userId, companyId, onSuccess } = action as DeleteUserCompanyRequest;

    const { data: responseBody } = yield call(
      apiGeneral.delete,
      `/user-companies/${userId}/${companyId}`
    );

    const { data } = responseBody;
    yield put(DeleteUserCompanyActions.success(data));
    notify("success", "Centro removido com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeleteUserCompanyActions.failure(errorMessage));
  }
}
