import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { IProduct } from "interfaces/product";

const { Types, Creators } = createActions(
    {
        request: ["query", "onSuccess"],
        success: ["data"],
        failure: ["error"],
        reset: [],
    },
    { prefix: "LIST_STOCK_PRODUCTS_" }
);

export interface ListStockProductsState extends IState {
    data: IProduct[];
}

interface ISuccessListStockProductsAction extends ISuccessAction {
    data: IProduct[];
}

const INITIAL_STATE: ListStockProductsState = {
    data: [],
    loading: false,
    error: null,
};

const request = (state: ListStockProductsState) =>
update(state, {
    loading: { $set: true },
    error: { $set: null },
});

const success = (state: ListStockProductsState, action: ISuccessListStockProductsAction) =>
update(state, {
    data: { $set: action.data },
    loading: { $set: false },
});

const failure = (state: ListStockProductsState, action: IFailureAction) =>
update(state, {
    loading: { $set: false },
    error: { $set: action.error },
});

const reset = () => INITIAL_STATE;

export const listStockProducts = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: request,
    [Types.SUCCESS]: success,
    [Types.FAILURE]: failure,
    [Types.RESET]: reset,
});

export const ListStockProductsTypes = Types;
export const ListStockProductsActions = Creators;
