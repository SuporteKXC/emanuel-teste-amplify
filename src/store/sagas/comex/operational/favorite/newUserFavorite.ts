import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  NewUserFavoriteActions,
  NewUserFavoriteRequestAction
} from 'store/ducks/comex/operational';

export function* newUserFavoriteRequest(action: any) {
  const { postData, onSuccess, onFailure }: NewUserFavoriteRequestAction = action;
  try {
    const { data } = yield call(api.post, `/user-favorite/create`, postData);
    onSuccess && onSuccess();
    notify('success', 'Ordem de compra favorita cadastrada!');
    yield all([
      put(NewUserFavoriteActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(NewUserFavoriteActions.failure(errorMessage));
  }
}
  
