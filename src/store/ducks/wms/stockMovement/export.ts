import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import {
  IState,
  ISuccessAction,
  IFailureAction,
} from "interfaces/paginate-duck";
import { IStocksList } from "interfaces/stocks";

const { Types, Creators } = createActions(
  {
    request: ["query"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "EXPORT_STOCKS_MOVEMENT" }
);

export interface ExportStockMovementState extends Omit<IState, 'pagination'> {
  data: IStocksList[] | Record<string, any>[];
}

const INITIAL_STATE: ExportStockMovementState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ExportStockMovementState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ExportStockMovementState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ExportStockMovementState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const exportStockMovement = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ExportStockMovementTypes = Types;
export const ExportStockMovementActions = Creators;
