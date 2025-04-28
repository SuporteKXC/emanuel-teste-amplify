import { call, put } from 'redux-saga/effects';
import { apiGeneral, notify, queryBuilder } from 'services';
import { IListRequest } from 'interfaces/list-duck';
import { requestErrorHandler } from 'utils';
import { ListUsersActions } from 'store/ducks/settings/users';

import { User } from 'interfaces/user';

export function* listUsersRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IListRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(apiGeneral.get, `/users?${queryString}`);
    const comboOptions = data.map((user: User) => ({
      value: user.id,
      label: `${user.name || '---'}`,
    }));

    yield put(ListUsersActions.success(comboOptions));
    if (onSuccess) onSuccess(comboOptions);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify('error', errorMessage);
    yield put(ListUsersActions.failure(errorMessage));
  }
}
