import { RootState } from "@/store";
import { CountryState, ShowOrderFilesActions, ShowOrderFilesRequestAction } from "@/store/ducks";
import { all, call, put, select } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler, applyQueryString } from "services"; 

const stateCountry = (state: RootState) => state.country

export function* showOrderFilesRequest(action: any) {
  const { id, onSuccess, onFailure }: ShowOrderFilesRequestAction = action;

  try {

    let url = "/order-files/" + id;

    const { data } = yield call(api.get, url);

    onSuccess && onSuccess(data);
    yield all([put(ShowOrderFilesActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(ShowOrderFilesActions.failure(errorMessage));
  }
}
