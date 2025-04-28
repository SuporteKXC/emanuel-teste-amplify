import { call, put } from "redux-saga/effects";
import { apiGeneral, notify, queryBuilder } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { ListGroupsActions } from "store/ducks/settings/groups";

import { IGroup } from "interfaces/group";

export function* listGroupsRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IListRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(apiGeneral.get, `/groups?${queryString}`);
    const comboOptions = data.map((group: IGroup) => ({
      value: group.id,
      label: group.name,
    }));

    yield put(ListGroupsActions.success(comboOptions));
    if (onSuccess) onSuccess(comboOptions);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListGroupsActions.failure(errorMessage));
  }
}
