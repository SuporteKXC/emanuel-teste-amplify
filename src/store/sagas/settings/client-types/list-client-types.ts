import { call, put } from "redux-saga/effects";
import { apiGeneral, notify, queryBuilder } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { ListClientTypesActions } from "store/ducks/settings/client-types";

import { ClientType } from "interfaces/client-type";

export function* listClientTypesRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IListRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(apiGeneral.get, `/client-types?${queryString}`);
    const comboOptions = data.map((clientType: ClientType) => ({
      value: clientType.id,
      label: clientType.name,
    }));

    yield put(ListClientTypesActions.success(comboOptions));
    if (onSuccess) onSuccess(comboOptions);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListClientTypesActions.failure(errorMessage));
  }
}
