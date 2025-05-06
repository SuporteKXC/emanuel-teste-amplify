import { apiComexExport, apiErrorHandler, applyQueryString, notify } from "@/services";
import { RootState } from "@/store";
import { CountryState } from "@/store/ducks";
import { ExportExportOrderItemsActions, ExportExportOrderItemsRequestAction } from "@/store/ducks/comex/operational/exportExportOrderItens";
import { all, call, put, select } from "@redux-saga/core/effects";
// import { api, notify, apiErrorHandler, applyQueryString } from "services";

// import { ExportExportOrderItemsRequestAction, ExportExportOrderItemsActions } from "store/ducks/comex/operational";

const stateCountry = (state: RootState) => state.country

export function* exportExportOrderItemsRequest(action: any) {
  const { params, onSuccess, onFailure }: ExportExportOrderItemsRequestAction = action;

  try {
    const country: CountryState = yield select(stateCountry)

    const url = applyQueryString("/export-order-item/export",{...params, country: country.currentCountry });
    const { data } = yield call(apiComexExport.get, url);

    onSuccess && onSuccess(data);
    yield all([
      put(ExportExportOrderItemsActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(ExportExportOrderItemsActions.failure(errorMessage));
  }
}
