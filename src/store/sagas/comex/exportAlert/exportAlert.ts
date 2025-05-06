import { RootState } from "@/store";
import { CountryState } from "@/store/ducks";
import { all, call, put, select } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler, applyQueryString } from "services";
import { ExportOrderItemAlertRequestAction, ExportOrderItemAlertActions } from "store/ducks/comex/exportAlert";

const stateCountry = (state: RootState) => state.country

export function* exportOrderItemAlertsRequest(action: any) {

  const { params, onSuccess, onFailure }: ExportOrderItemAlertRequestAction = action;

  try {
    const country: CountryState = yield select(stateCountry)

    let url = "/user-export-order-item-alert/index";

    if (params) {
      url = applyQueryString(url, {...params, country: country.currentCountry });
    }

    const { data } = yield call(api.get, url);

    onSuccess && onSuccess(data);
    yield all([put(ExportOrderItemAlertActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(ExportOrderItemAlertActions.failure(errorMessage));
  }
}
