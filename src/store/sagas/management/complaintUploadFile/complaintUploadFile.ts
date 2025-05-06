import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks } from "services";
import {
  ComplaintUploadFileActions,
  ComplaintUploadFileRequestAction,
  IComplaintUploadFileData,
} from "store/ducks/management/complaintUploadFile";

export function* complaintUploadFileRequest(action: any) {
  const { file, onSuccess, onFailure }: ComplaintUploadFileRequestAction =
    action;

  let index = 0;
  let files: IComplaintUploadFileData[] = [];
  try {
    while (index < file.length) {
      const { data } = yield call(apiStocks.get, "/complaint/signed-upload", {
        params: {
          fileKey: file[index].name,
          fileType: file[index].type,
        },
      });

      yield call(fetch, data.urlSigned, {
        method: "PUT",
        body: file[index].data,
      });

      const dataOnSuccess = {
        ...file[index],
        fileKey: data.fileKey,
      };

      files.push(dataOnSuccess);
      yield all([put(ComplaintUploadFileActions.success())]);

      index++;
    }
    onSuccess && onSuccess(files);
  } catch (error) {
    console.log(error);
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    yield put(ComplaintUploadFileActions.failure(errorMessage));
  }
}
