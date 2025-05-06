import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
    UpdateRelatedProductActions,
    UpdateRelatedProductRequestAction
} from 'store/ducks';

export function* updateRelatedProductRequest(action: any) {
    const { id, postData, onSuccess, onFailure }: UpdateRelatedProductRequestAction = action;
    try {
      
      const { data } = yield call(api.put, `/product/update-related/${id}`, postData);

      onSuccess && onSuccess();
      notify('success', 'Produto Atualizado!');
      yield all([
        put(UpdateRelatedProductActions.success()),
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(UpdateRelatedProductActions.failure(errorMessage));
    }
  }