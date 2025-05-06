import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  ModulesRequestAction,
  ModulesListActions
} from 'store/ducks/general'

export function* modulesRequest(action: any) {
    const { onSuccess, onFailure }: ModulesRequestAction = action;

    try {
      const { data } = yield call(api.get, `/permission/modules`);

      onSuccess && onSuccess();
      yield all([
        put(ModulesListActions.success(data))
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(ModulesListActions.failure(errorMessage));
    }
  }