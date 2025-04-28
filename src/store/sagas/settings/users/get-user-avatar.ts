
import { call, put } from "redux-saga/effects";

import { apiGeneral } from "services";
import { IFechRequest } from "interfaces/fetch-duck";
import { requestErrorHandler } from "utils";
import { GetUserAvatarActions } from "store/ducks/settings/users";

export function* getUserAvatar(action: any) {
  try {
    const { id, onSuccess } = action as IFechRequest;
    const { data } = yield call(apiGeneral.get, `user-avatar/${id}/tempURL`);
    
    yield put(GetUserAvatarActions.success(data));
    if (onSuccess) onSuccess(data);
  } catch (error) {
    const { onFailure } = action as IFechRequest;
    if (onFailure) onFailure();
    const { errorMessage } = requestErrorHandler(error);
    // notify("error", errorMessage);
    yield put(GetUserAvatarActions.failure(errorMessage));
  }
}

