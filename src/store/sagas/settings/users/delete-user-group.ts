import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { requestErrorHandler } from "utils";
import {
  DeleteUserGroupActions,
  DeleteUserGroupRequest,
} from "store/ducks/settings/users";

export function* deleteUserGroupRequest(action: any) {
  try {
    const { userId, groupId, onSuccess } = action as DeleteUserGroupRequest;

    const { data: responseBody } = yield call(
      apiGeneral.delete,
      `/user-groups/${userId}/${groupId}`
    );

    const { data } = responseBody;
    yield put(DeleteUserGroupActions.success(data));
    notify("success", "Grupo removido com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeleteUserGroupActions.failure(errorMessage));
  }
}
