import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  FetchCompanyMemberActions as Actions,
  FetchCompanyMemberRequestAction as RequestAction,
} from 'store/ducks/companyMembers';

export function* fetchCompanyMemberRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestAction = action;
  try {
    const { data } = yield call(api.get, `company-members/${id}`);
    onSuccess && onSuccess();
    yield put(Actions.success(data));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage));
  }
}
