import { call, put } from "redux-saga/effects";
import { apiGeneral, notify, queryBuilder } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { ListCarriersActions } from "store/ducks/settings/carriers";

import { Carrier } from "interfaces/carrier";

export function* listCarriersRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IListRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(apiGeneral.get, `/carriers?${queryString}`);
    const comboOptions = data.map((carrier: Carrier) => ({
      value: carrier.id,
      label: `${carrier.trade_name} - ${carrier.address_city}/${carrier.address_state}`,
    }));

    yield put(ListCarriersActions.success(comboOptions));
    if (onSuccess) onSuccess(comboOptions);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListCarriersActions.failure(errorMessage));
  }
}
