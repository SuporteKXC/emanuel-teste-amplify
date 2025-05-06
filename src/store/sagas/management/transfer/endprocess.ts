import { all, call, put, select } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks } from "services";
import { RootState } from "store";
import { TransferEndProcessActions, TransferEndProcessRequestAction } from "store/ducks/management/transfer";


const auth = (state: RootState) => state.auth

export function* transferEndProcessRequest(action: any) {
  const {
    query,
    onSuccess,
    onFailure,
  }: TransferEndProcessRequestAction = action;
  try {
    const { data: { token } } = yield select(auth);

    apiStocks.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const { data } = yield call(apiStocks.put, `/transfer/end-process/${query}`);
    onSuccess && onSuccess(data.data);
    notify('success', 'Processo finalizado!');
    yield all([put(TransferEndProcessActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    yield all([put(TransferEndProcessActions.failure(errorMessage))]);
  }
}
