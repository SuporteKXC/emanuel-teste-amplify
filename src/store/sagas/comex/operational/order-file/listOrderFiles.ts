import { RootState } from "@/store";
import { CountryState, ListOrderFilesActions, ListOrderFilesRequestAction } from "@/store/ducks";
import { all, call, put, select } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler, applyQueryString } from "services"; 

const stateCountry = (state: RootState) => state.country

export function* orderFilesRequest(action: any) {
  const { params, onSuccess, onFailure }: ListOrderFilesRequestAction = action;

  try {
    const country: CountryState = yield select(stateCountry)

    let url = "/order-files";

    if (params) {
      url = applyQueryString(url, {...params, country: country.currentCountry });
    }

    const { data } = yield call(api.get, url);

    onSuccess && onSuccess(data);
    yield all([put(ListOrderFilesActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(ListOrderFilesActions.failure(errorMessage));
  }
}
