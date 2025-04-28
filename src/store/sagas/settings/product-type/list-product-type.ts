import { call, put } from 'redux-saga/effects';
import { apiGeneral, notify, queryBuilder } from 'services';
import { IListRequest } from 'interfaces/list-duck';
import { requestErrorHandler } from 'utils';
import { ListProductTypeActions } from 'store/ducks/settings/product-type';
import { IProductType } from 'interfaces/product-type';

export function* listProductTypeRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IListRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(
      apiGeneral.get,
      `/product-types?${queryString}`
    );

    let comboOptions = [];
    if (data.types && data.types.length > 0) {
      comboOptions = data.types.map((productType: IProductType) => ({
        value: productType.id,
        label: productType.description,
      }));
    } else if (data.length > 0) {
      comboOptions = data.map((productType: IProductType) => ({
        value: productType.id,
        label: productType.description,
      }));
    }
    yield put(ListProductTypeActions.success(comboOptions));
    if (onSuccess) onSuccess(data);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify('error', errorMessage);
    yield put(ListProductTypeActions.failure(errorMessage));
  }
}
