import { call, put } from "redux-saga/effects";
import { apiGeneral, notify, queryBuilder } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { ListBusinessActions } from "store/ducks/settings/business";

import { Business } from "interfaces/business";

export function* listBusinessRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IListRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(apiGeneral.get, `/business?${queryString}`);
    const comboOptions = data.map((business: Business) => ({
      value: business.id,
      label: `${business.activity_division} - ${business.description}`,
    }));

    yield put(ListBusinessActions.success(comboOptions));
    if (onSuccess) onSuccess(comboOptions);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListBusinessActions.failure(errorMessage));
  }
}
