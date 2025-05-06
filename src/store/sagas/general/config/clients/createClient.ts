import { call, put } from "@redux-saga/core/effects";
import { apiStocks, notify, apiErrorHandler } from "services";
import {
  CreateClientActions as Actions,
  CreateClientRequestAction as RequestAction,
} from "store/ducks/general";

export function* createClientRequest(action: any) {
  const { postData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiStocks.post, `clients`, postData);
    onSuccess && onSuccess();
    notify("success", "Cliente criado com sucesso");
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
