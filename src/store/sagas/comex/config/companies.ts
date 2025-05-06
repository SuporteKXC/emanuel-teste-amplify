import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  CompanyRequestAction,
  CompanyActions
} from 'store/ducks'

export function* companyRequest(action: any) {
    const { onSuccess, onFailure }: CompanyRequestAction = action;

    try {
      const { data } = yield call(api.get, `/company/index`);

      onSuccess && onSuccess(data);
      yield all([
        put(CompanyActions.success(data))
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(CompanyActions.failure(errorMessage));
    }
  }