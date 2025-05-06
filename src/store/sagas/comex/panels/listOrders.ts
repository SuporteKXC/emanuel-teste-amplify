import { RootState } from "@/store";
import { CountryState } from "@/store/ducks";
import { all, call, put, select } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler, applyQueryString } from "services";
import { ProductsRequestAction, ProductsActions } from "store/ducks/comex/panels";



const stateCountry = (state: RootState) => state.country

export function* productsListRequest(action: any) {
  const { params, onSuccess, onFailure }: ProductsRequestAction = action;

  try {

    const country: CountryState = yield select(stateCountry)

    let url = "/product/product-order-item";

    if (params) {
      url = applyQueryString(url, {...params, country: country.currentCountry });
    }

    const { data } = yield call(api.get, url);

    onSuccess && onSuccess(data);
    yield all([put(ProductsActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(ProductsActions.failure(errorMessage));
  }
}
