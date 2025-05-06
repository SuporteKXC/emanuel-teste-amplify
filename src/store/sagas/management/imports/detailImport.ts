import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import { ImportDetailActions, ImportListActions, ImportDetailRequestAction, InsertComplaintActions, InsertComplaintRequestAction, UpdateComplaintActions, UpdateComplaintRequestAction } from "store/ducks/management";

export function* detailImportRequest(action: any) {
  const {
    query,
    onSuccess,
    onFailure,
  }: ImportDetailRequestAction = action;

  try {
    const url = applyQueryString("stock-orders", {
      ...query
    });
    
    const { data } = yield call(apiStocks.get, `/stock-orders/${query}`);

    onSuccess && onSuccess(data.data);
    yield all([put(ImportDetailActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage, errorMessage);
    yield put(ImportDetailActions.failure(errorMessage));
  }
}


export function* insertComplaintRequest(action: any) {
  const {
    data: post,
    onSuccess,
    onFailure,
  }: InsertComplaintRequestAction = action;
  
  try {
  
    const { data } = yield call(apiStocks.post, `/complaints`, post);
    onSuccess && onSuccess(data);
    notify('success', 'Complaint cadastrado!');
    yield all([put(InsertComplaintActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    yield all([put(InsertComplaintActions.failure(errorMessage))]);
  }
}


export function* updateComplaintRequest(action: any) {
  const {
    data: post,
    onSuccess,
    onFailure,
  }: UpdateComplaintRequestAction = action;
  
  try {
  
    const { data } = yield call(apiStocks.put, `/complaints/${post.id}`, post);
    onSuccess && onSuccess(data.data);
    notify('success', 'Complaint atualizado!');
    yield all([put(UpdateComplaintActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    yield all([put(UpdateComplaintActions.failure(errorMessage))]);
  }
}