import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  OrderItemJustificationManyActions,
  OrderItemJustificationManyRequestAction
} from 'store/ducks/comex/operational'

export function* orderItemJustificationManyRequest(action: any) {
    const { postData, onSuccess, onFailure }: OrderItemJustificationManyRequestAction = action;
    try {
      const { data } = yield call(api.post, `/justification/createMany`, postData);
      onSuccess && onSuccess();
      notify('success', 'Justificativas Cadastradas!');
      yield all([
        put(OrderItemJustificationManyActions.success()),
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(OrderItemJustificationManyActions.failure(errorMessage));
    }
  }