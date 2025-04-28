import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateCompanyActions } from "store/ducks/settings/companies";

export function* updateCompanyRequest(action: any) {
  try {
    const { id, putData, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/companies/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateCompanyActions.success(data));
    notify("success", "Centro atualizado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateCompanyActions.failure(errorMessage));
  }
}
