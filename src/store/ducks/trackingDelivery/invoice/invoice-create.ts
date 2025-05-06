import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

import {
  ISuccessAction,
  IState,
  IFailureAction,
} from "@/contracts/trackingDelivery/create-duck";

const { Types, Creators } = createActions(
  {
    request: ["postData", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "INVOICE_CREATE_" }
);

export interface InvoiceCreateState extends IState {}

const INITIAL_STATE: InvoiceCreateState = {
  loading: false,
  error: null,
};

const request = (state: InvoiceCreateState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: InvoiceCreateState, action: ISuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: InvoiceCreateState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const invoiceCreate = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const InvoiceCreateTypes = Types;
export const InvoiceCreateActions = Creators;