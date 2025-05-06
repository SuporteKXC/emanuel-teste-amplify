import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import {
  DocumentsListActions,
  DocumentsListRequestAction,
} from "store/ducks/trackingDelivery/documents";

export function* listDocumentsRequest(action: any) {
  const { query, statusFilter, onSuccess, onFailure }: DocumentsListRequestAction = action;

  try {
    const url = applyQueryString("documents", {
      ...query,
      asList: 1,
    });

    const { data } = yield call(apiStocks.get, url);
    const { documents, indicators } = data;

    if (Array.isArray(statusFilter)) {
      console.log(statusFilter)
      const filteredDocuments = documents?.filter((document: any) =>
        statusFilter?.includes(document?.status)
      );
      documents?.splice(0, documents.length, ...filteredDocuments);
    }

    onSuccess && onSuccess(documents, indicators)

    yield all([put(DocumentsListActions.success(documents, indicators))]);
  } catch (error: any) {
    const { errorMessage } = apiErrorHandler(error);
    notify("error", errorMessage);
    if(error?.response?.status === 403) {
      onFailure && onFailure();
    }

    yield put(DocumentsListActions.failure(errorMessage));
  }
}
