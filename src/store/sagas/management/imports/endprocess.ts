import { all, call, put, select } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks } from "services";
import { RootState } from "store";
import {
  EndProcessActions,
  EndProcessRequestAction,
} from "store/ducks/management";

const auth = (state: RootState) => state.auth;

export function* endProcessRequest(action: any) {
  const { post, onSuccess, onFailure }: EndProcessRequestAction = action;
  try {
    const {
      data: { token },
    } = yield select(auth);

    apiStocks.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const { data } = yield call(
      apiStocks.put,
      `/stock-movements-snapshot/end-process/`,
      post
    );
    onSuccess && onSuccess(data.data);
    notify("success", "Processo finalizado!");
    yield all([put(EndProcessActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    yield all([put(EndProcessActions.failure(errorMessage))]);
  }
}
