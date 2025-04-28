import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import {
  IState,
  ISuccessAction,
  IFailureAction,
} from "interfaces/export-duck";
import { IStocksList } from "interfaces/stocks";

const { Types, Creators } = createActions(
  {
    request: ["query"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "EXPORT_STOCKS_" }
);

export interface ExportStocksState extends IState {
  data: IStocksList[] | Record<string, any>[];
}

const INITIAL_STATE: ExportStocksState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ExportStocksState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ExportStocksState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ExportStocksState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const exportStocks = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ExportStocksTypes = Types;
export const ExportStocksActions = Creators;
