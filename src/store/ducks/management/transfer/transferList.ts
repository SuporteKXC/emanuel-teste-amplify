
import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { CamelPagination } from "contracts";
import { TransferListData } from "contracts/management";


const { Types, Creators } = createActions(
{
    request: ["query", "onSuccess", "onFailure"],
    success: ["data", "pagination"],
    failure: ["error"],
    reset: [],
},
{
    prefix: "LIST_TRANSFERS_",
}
);

export const TransferListTypes = Types;
export const TransferListActions = Creators;


export interface TransferListState {
data: TransferListData[] | null;
pagination?: CamelPagination;
loading: boolean;
error: string | null;
}


interface SuccessAction {
data: TransferListData[];
pagination: CamelPagination;
loading: boolean;
}
interface FailureAction {
error: string;
loading: boolean;
}


const INITIAL_STATE: TransferListState = {
data: null,
pagination: undefined,
loading: false,
error: null,
};


const _request = (state: TransferListState) =>
update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: TransferListState, action: SuccessAction) => {
return update(state, {
loading: { $set: false },
data: { $set: action.data },
pagination: { $set: action.pagination },
});
};

const _failure = (state: TransferListState, action: FailureAction) =>
update(state, {
loading: { $set: false },
error: { $set: action.error },
});


const _reset = () => INITIAL_STATE;

export const transferList = createReducer(INITIAL_STATE, {
[Types.REQUEST]: _request,
[Types.SUCCESS]: _success,
[Types.FAILURE]: _failure,
[Types.RESET]: _reset,
});
