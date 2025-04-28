import { call, put } from "redux-saga/effects";
import { apiGeneral, notify, queryBuilder } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { ListRolesActions } from "store/ducks/roles";

import { IRole } from "interfaces/role";

export function* listRolesRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IListRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(apiGeneral.get, `/roles?${queryString}`);
    const comboOptions = data.map((role: IRole) => ({
      value: role.id,
      label: role.name,
    }));

    yield put(ListRolesActions.success(comboOptions));
    if (onSuccess) onSuccess(comboOptions);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListRolesActions.failure(errorMessage));
  }
}
