import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  CountryActions
} from '@/store/ducks/comex/country'

export function* countriesRequest() {

    try {
      const { data } = yield call(api.get, `/country`);

   
      yield put(CountryActions.success(data))
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      notify('error', errorMessage);
      console.log(error)
      yield put(CountryActions.failure(errorMessage));
    }
  }