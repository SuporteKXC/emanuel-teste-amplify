import { call, put, select } from "redux-saga/effects";
import { notify, apiGeolocation, apiErrorHandler } from "services";

import { ICreateRequest } from "@/contracts/trackingDelivery/create-duck";
import { GeolocationCreateActions } from "@/store/ducks/trackingDelivery/geolocation/geolocation-create";
import { RootState } from "@/store";

const auth = (state: RootState) => state.auth
export function* geolocationCreateRequest(action: any) {
  const { postData, onSuccess, onFailure } = action as ICreateRequest;
  try {
   

    const { data: { token } } = yield select(auth);

    apiGeolocation.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const { data: responseBody } = yield call(
      apiGeolocation.post,
      "geolocation",
      postData
    );

    yield put(GeolocationCreateActions.success(responseBody));
    if (onSuccess) onSuccess(responseBody);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);

    if(onFailure) {
      onFailure()
    }

    if(!onFailure) {
      notify("error", errorMessage);
    }
   
    yield put(GeolocationCreateActions.failure(errorMessage));
  }
}
