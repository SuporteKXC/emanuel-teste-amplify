import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { DeleteCompanyActions } from "store/ducks/settings/companies";

export function* deleteCompanyRequest(action: any) {
  try {
    const { id, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.delete,
      `/companies/${id}`
    );

    const { data } = responseBody;
    yield put(DeleteCompanyActions.success(data));
    notify("success", "Centro deletado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeleteCompanyActions.failure(errorMessage));
  }
}
