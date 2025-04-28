import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateUserAvatarActions } from "store/ducks/settings/users";

export function* createUserAvatar(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/user-avatar`,
      postData
    );
    
    const { data } = responseBody;
    yield put(CreateUserAvatarActions.success(data));
    notify("success", "Avatar adicionada com sucesso");
    if (onSuccess) onSuccess(postData);
  } catch (error) {
    const { postData, onFailure } = action as ICreateRequest;
    if (onFailure) onFailure(postData);
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateUserAvatarActions.failure(errorMessage));
  }
}
