import { call, put } from "redux-saga/effects";
import { apiGeneral, notify, queryBuilder } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { ListPalletTypeActions } from "store/ducks/settings/pallet-type";
import { IPalletType } from "interfaces/pallet-type";

export function* listPalletTypeRequest(action: any) {
  try {
    const { query = {} , onSuccess } = action as IListRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(apiGeneral.get, `/palletType?${queryString}`);

    const comboOptions = data.map((palletType: IPalletType) => ({
      value: palletType.id,
      label: palletType.description,
    }));

    yield put(ListPalletTypeActions.success(comboOptions));

    if (onSuccess) onSuccess(data);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListPalletTypeActions.failure(errorMessage));
  }
}
