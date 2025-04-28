import { call, put } from "redux-saga/effects";
import { apiGeneral, notify, queryBuilder } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler, riskClass } from "utils";
import { ListProductRisksActions } from "store/ducks/settings/product-risks/list-product-risks";

import { ProductRisk, ProduckRiskOption } from "interfaces/product-risk";

export function* listProductRisksRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IListRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(apiGeneral.get, `/product-risks?${queryString}`);
    const comboOptions: ProduckRiskOption[] = data.map((risk: ProductRisk) => ({
      value: risk.id,
      label: `${riskClass(risk.classes)} - ${risk.name}`,
      classes: risk.classes,
    }));

    yield put(ListProductRisksActions.success(comboOptions));
    if (onSuccess) onSuccess(comboOptions);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListProductRisksActions.failure(errorMessage));
  }
}
