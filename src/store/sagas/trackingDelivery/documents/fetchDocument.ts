import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks } from "services";
import {
  DocumentFetchActions,
  DocumentFetchRequestAction,
} from "store/ducks/trackingDelivery/documents";

export function* fetchDocumentRequest(action: any) {
  const { id, onSuccess, onFailure }: DocumentFetchRequestAction = action;

  try {
    const { data } = yield call(apiStocks.get, `/documents/${id}`);

    onSuccess && onSuccess(data);
    yield all([
      put(DocumentFetchActions.success(data))
    ]);
  } catch (error: any) {
    const { errorMessage } = apiErrorHandler(error);
    notify('error', errorMessage);
    if(error?.response.status === 403) {
      onFailure && onFailure();
    }
    yield put(DocumentFetchActions.failure(errorMessage));
  }
}
