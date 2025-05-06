import { call, put } from "@redux-saga/core/effects";
import { daysOfWeek } from "constants/Common";
import { apiStocks, notify, apiErrorHandler } from "services";
import {
  FetchClientActions as Actions,
  FetchClientRequestAction as RequestAction,
} from "store/ducks/general";

export function* fetchClientRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestAction = action;
  try {
    const { data } = yield call(apiStocks.get, `clients/${id}`);
    const dayOptions: any[] = [];
    Object.entries(data).forEach(([key, value]) => {
      daysOfWeek.includes(key) &&
        value &&
        dayOptions.push({
          id: key,
          value: key,
        });
    });
    data.days = dayOptions;
    onSuccess && onSuccess(data);
    yield put(Actions.success(data));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    yield put(Actions.failure(errorMessage));
  }
}
