import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { Order } from "@/contracts";

const { Types, Creators } = createActions(
  {
    request: ["order"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  {
    prefix: "COMEX_SEARCH_ORDERS",
  }
);

export interface SearchOrderOptionsState {
  data: Order[] | null;
  loading: boolean;
  error: string | null;
}

export interface SearchOrderOptionsRequestAction {
  order: string;
}

interface SuccessAction {
  data: Order[];
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: SearchOrderOptionsState = {
  data: null,
  loading: false,
  error: null,
};

const request = (state: SearchOrderOptionsState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const success = (state: SearchOrderOptionsState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

const failure = (state: SearchOrderOptionsState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const searchOrderOptions = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const SearchOrderOptionsTypes = Types;
export const SearchOrderOptionsActions = Creators;
