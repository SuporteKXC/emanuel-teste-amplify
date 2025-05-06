import { overlayRef } from "@/components/management/Tracking/Import/Detail/Overlay";
import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks } from "services";
import { ComplaintShowActions } from "store/ducks/management/complaint/complaintShow";

export function* complaintShowRequest(action: any) {
  try {
    if (overlayRef.current) overlayRef.current.style.visibility = "visible";

    const { id, showComplaintSuccess } = action;
    const { data } = yield call(apiStocks.get, `complaints/${id}`);

    showComplaintSuccess && showComplaintSuccess(data);

    yield all([put(ComplaintShowActions.success(data))]);

    if (overlayRef.current) overlayRef.current.style.visibility = "hidden";
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    const { showComplaintError } = action;
    notify("error", errorMessage, errorMessage);
    yield put(ComplaintShowActions.failure(errorMessage));
    showComplaintError && showComplaintError();
    if (overlayRef.current) overlayRef.current.style.visibility = "hidden";
  }
}
