import { call, put } from "redux-saga/effects";
import { apiGeneral, notify, queryBuilder } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { ListCitiesActions } from "store/ducks/cities";

import { ICity } from "interfaces/city";

export function* listCitiesRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IListRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(apiGeneral.get, `/cities?${queryString}`);
    const comboOptions = data.map((city: ICity) => ({
      value: city.name,
      label: city.name,
      ibge: city.ibge,
    }));

    yield put(ListCitiesActions.success(comboOptions));
    if (onSuccess) onSuccess(comboOptions);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListCitiesActions.failure(errorMessage));
  }
}
