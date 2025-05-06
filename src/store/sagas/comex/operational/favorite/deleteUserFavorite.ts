import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
    DeleteUserFavoriteActions,
    DeleteUserFavoriteRequestAction,
} from 'store/ducks/comex/operational';

export function* deleteUserFavoriteRequest(action: any) {
  const { id, onSuccess, onFailure }: DeleteUserFavoriteRequestAction = action;
  try {
    const { data } = yield call(api.delete, `/user-favorite/delete/${id}`);
    onSuccess && onSuccess();
    notify('success', 'Ordem de compra favorita removida!');
    yield all([
      put(DeleteUserFavoriteActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(DeleteUserFavoriteActions.failure(errorMessage));
  }
}
