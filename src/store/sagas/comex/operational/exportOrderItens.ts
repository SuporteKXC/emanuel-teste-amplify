import { RootState } from "@/store";
import { CountryState } from "@/store/ducks";
import { all, call, put, select } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler, applyQueryString } from "services";
import { ExportOrderItemsRequestAction, ExportOrderItemsActions } from "store/ducks/comex/operational";

const stateCountry = (state: RootState) => state.country

export function* exportOrderItemsRequest(action: any) {
  const { params, onSuccess, onFailure }: ExportOrderItemsRequestAction = action;

  try {
    const country: CountryState = yield select(stateCountry)

    const url = applyQueryString("/order-item/export",{...params, country: country.currentCountry });
    const { data } = yield call(api.get, url);

    onSuccess && onSuccess(data);
    yield all([
      put(ExportOrderItemsActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(ExportOrderItemsActions.failure(errorMessage));
  }
}
