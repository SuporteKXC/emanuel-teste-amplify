import { call, put } from "redux-saga/effects";
import { apiGeneral, notify, queryBuilder } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { ListCompaniesFilterActions } from "store/ducks/settings/companies";

import { Company } from "interfaces/company";

export function* listCompaniesFilterRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IListRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(apiGeneral.get, `/companies?${queryString}`);
    const comboOptions = data.map((company: Company) => ({
      value: company.id,
      label: `${company.code || "---"} - ${company.trade_name}`,
    }));

    yield put(ListCompaniesFilterActions.success(comboOptions));
    if (onSuccess) onSuccess(comboOptions);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListCompaniesFilterActions.failure(errorMessage));
  }
}
