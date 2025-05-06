import { call, put } from "@redux-saga/core/effects";
import { apiStocks, notify, apiErrorHandler } from "services";
import {
  CreateCompanyActions as Actions,
  CreateCompanyRequestAction as RequestAction,
} from "store/ducks/general";

export function* createCompanyRequest(action: any) {
  const { postData, onSuccess, onFailure }: RequestAction = action;

  try {
    yield call(apiStocks.post, `companies`, postData);
    onSuccess && onSuccess();
    notify("success", "Empresa criada com sucesso");
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
