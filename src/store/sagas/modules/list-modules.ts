import { call, put } from "redux-saga/effects";
import { apiGeneral, notify, queryBuilder } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { ListModulesActions } from "store/ducks/modules";

import { Module } from "interfaces/module";

export function* listModulesRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IListRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(apiGeneral.get, `/modules?${queryString}`);
    const comboOptions = data.map((module: Module) => ({
      value: module.id,
      label: module.name,
    }));

    yield put(ListModulesActions.success(comboOptions));
    if (onSuccess) onSuccess(comboOptions);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListModulesActions.failure(errorMessage));
  }
}
