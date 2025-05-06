import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import { TransferDetailActions, TransferDetailRequestAction, TransferInsertComplaintActions, TransferInsertComplaintRequestAction } from "store/ducks/management/transfer";

export function* detailTransferRequest(action: any) {
  const {
    query,
    onSuccess,
    onFailure,
  }: TransferDetailRequestAction = action;

  try {
    const url = applyQueryString("stock-orders", {
      ...query
    });
 
    const { data } = yield call(apiStocks.get, `/transfer/${query}`);

    onSuccess && onSuccess(data.data);
    yield all([put(TransferDetailActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(TransferDetailActions.failure(errorMessage));
  }
}


export function* transferInsertComplaintRequest(action: any) {
  const {
    data: post,
    onSuccess,
    onFailure,
  }: TransferInsertComplaintRequestAction = action;
  
  try {
  
    const { data } = yield call(apiStocks.post, `/transfer-complaints`, post);
    onSuccess && onSuccess(data.data);
    notify('success', 'Complaint cadastrado!');
    yield all([put(TransferInsertComplaintActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage, errorMessage);
    yield all([put(TransferInsertComplaintActions.failure(errorMessage))]);
  }
}
