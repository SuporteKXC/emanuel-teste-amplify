import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { ProduckRiskOption } from "interfaces/product-risk";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_PRODUCT_RISKS" }
);

export interface ListProductRisksState extends IState {
  data: ProduckRiskOption[];
}

interface ISuccessListProductRisksAction extends ISuccessAction {
  data: ProduckRiskOption[];
}

const INITIAL_STATE: ListProductRisksState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListProductRisksState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListProductRisksState, action: ISuccessListProductRisksAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListProductRisksState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listProductRisks = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListProductRisksTypes = Types;
export const ListProductRisksActions = Creators;
