import { call, put } from "redux-saga/effects";

import { apiGeneral, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginatePalletTypeActions } from "store/ducks/settings/pallet-type";

export function* paginatePalletTypeRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiGeneral.get,
      `/palletType?${queryString}`
    );

    const { types, pagination } = responseBody;
    yield put(PaginatePalletTypeActions.success(types, pagination));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginatePalletTypeActions.failure(errorMessage));
  }
}
