import { call, put, select } from "redux-saga/effects";
import { notify, apiErrorHandler, apiInvoiceImport } from "services";

import { ICreateRequest } from "@/contracts/trackingDelivery/create-duck";
import { InvoiceCreateActions } from "@/store/ducks/trackingDelivery/invoice/invoice-create";
import { RootState } from "@/store";

const auth = (state: RootState) => state.auth;
export function* invoiceCreateRequest(action: any) {
  const { postData, onSuccess, onFailure } = action as ICreateRequest;
  try {
  
    const {
      data: { token },
    } = yield select(auth);

  
    const { data: responseBody } = yield call(
      apiInvoiceImport.post,
      "import-invoices",
      postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    yield put(InvoiceCreateActions.success(responseBody));
    if (onSuccess) onSuccess(responseBody);
  } catch (error) {
    if(onFailure) onFailure()
    const { errorMessage } = apiErrorHandler(error);
    
    notify("error", errorMessage);
    yield put(InvoiceCreateActions.failure(errorMessage));
  }
}