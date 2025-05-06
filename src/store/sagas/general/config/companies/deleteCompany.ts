import { call, put } from "@redux-saga/core/effects";
import { apiStocks, notify, apiErrorHandler } from "services";
import {
  DeleteCompanyActions as Actions,
  DeleteCompanyRequestAction as RequestAction,
} from "store/ducks/general";

export function* deleteCompanyRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiStocks.delete, `companies/${id}`);
    onSuccess && onSuccess();
    notify("success", "Empresa excluída com sucesso");
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
