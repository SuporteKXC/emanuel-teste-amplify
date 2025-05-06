import { all, call, put, take, fork } from "@redux-saga/core/effects";
import { END, eventChannel, EventChannel } from "redux-saga";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import {
  ImportExportActions,
  ImportExportRequestAction,
} from "store/ducks/management";

interface ResponseChannel
  extends Array<EventChannel<any> | Promise<void> | any> {
  0: Promise<void>;
  1: EventChannel<any>;
}

function createChannel(payload: any): ResponseChannel {
  let emitter: (_: any) => void;

  const url = applyQueryString("stock-orders", {
    ...payload,
    asList: true,
    limit: 50000,
  });

  const event = eventChannel((emit) => {
    emitter = emit;
    return () => {};
  });

  const promise: Promise<void> = new Promise((resolve, reject) => {
    apiStocks
      .get(url, {
        onDownloadProgress: emitter,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Transfer-Encoding": "chunked",
        },
      })
      .then((data) => {
        emitter({ loaded: 100, total: 100 });
        setTimeout(() => {
          emitter(END);
          resolve(data.data);
        }, 3000);
      })
      .catch((err) => {
        reject(err);
        emitter(END);
      });
  });

  return [promise, event];
}

function* onProgress(channel: EventChannel<any>): any {
  while (true) {
    const progress = yield take(channel);
    const loaded = (progress.loaded * 100) / progress.total;
    yield put(ImportExportActions.load(Math.floor(loaded)));
  }
}

export function* exportImportRequest(action: any): any {
  const { query, onSuccess, onFailure }: ImportExportRequestAction = action;
  try {
    const [promise, event] = createChannel(query);
    yield fork(onProgress, event);
    const data = yield call(() => promise);
    onSuccess && onSuccess(data.data);
    yield all([put(ImportExportActions.success(data.data, data.meta))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(ImportExportActions.failure(errorMessage));
  }
}
