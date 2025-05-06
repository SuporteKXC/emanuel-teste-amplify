import { RootState } from '@/store';
import { CountryState } from '@/store/ducks';
import { all, call, put, select } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  OrderItemRequestAction,
  OrderItemActions
} from 'store/ducks/comex/operational'

const stateCountry = (state: RootState) => state.country

export function* orderItemRequest(action: any) {
  const { params, onSuccess, onFailure }: OrderItemRequestAction = action;

  try {

    const country: CountryState = yield select(stateCountry)

    
  
    const url = applyQueryString(`/order-item/index`,{...params, country: country.currentCountry })
    const { data } = yield call(api.get, url);
    onSuccess && onSuccess(data);
    yield all([
      put(OrderItemActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(OrderItemActions.failure(errorMessage));
  }
}