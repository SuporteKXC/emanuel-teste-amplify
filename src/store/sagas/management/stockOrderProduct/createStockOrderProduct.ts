import { all, call, put } from '@redux-saga/core/effects';
import { notify, apiErrorHandler, apiStocks } from 'services';
import { StockOrderProductCreateActions, StockOrderProductCreateRequestAction } from 'store/ducks/management/stockOrderProduct';

export function* newStockOrderProductRequest(action: any) {
    const { postData, onSuccess, onFailure }: StockOrderProductCreateRequestAction = action;
    try {
      const {data} = yield call(apiStocks.post, `stock-order-products`, postData);
    //   notify('success', '');
      console.log("SagaData", data)
      onSuccess && onSuccess(data)
      yield all([
        put(StockOrderProductCreateActions.success()),
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(StockOrderProductCreateActions.failure(errorMessage));
    }
  }