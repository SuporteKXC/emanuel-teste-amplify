import { call, put } from "@redux-saga/core/effects";
import { apiStocks, notify, apiErrorHandler } from "services";
import {
  UpdateCompanyActions as Actions,
  UpdateCompanyRequestAction as RequestAction,
} from "store/ducks/general";

export function* updateCompanyRequest(action: any) {
  const { id, putData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiStocks.put, `companies/${id}`, putData);
    onSuccess && onSuccess();
    notify("success", "Empresa atualizada com sucesso");
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
