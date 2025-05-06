import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  FiltersRequestAction,
  FiltersListActions
} from 'store/ducks/general'

export function* filtersRequest(action: any) {
    const { onSuccess, onFailure }: FiltersRequestAction = action;

    try {
      const { data } = yield call(api.get, `/permission/filters`);

      onSuccess && onSuccess();
      yield all([
        put(FiltersListActions.success(data))
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(FiltersListActions.failure(errorMessage));
    }
  }