import { OrderFile } from "@/contracts/comex/OrderFile";
import update from "immutability-helper";
import { createActions, createReducer } from "reduxsauce";

interface PostData {
    file:{order_id: string,
    fileLink: string
    description: string}[]
}

const { Types, Creators } = createActions(
    {
        request: ['postData','onSucess'],
        success: ['data'],
        failure: ['error'],
        reset: [],
    },
    {
        prefix: 'ORDER_FILE_CREATE_',
    }
)
export const CreateOrderFileTypes = Types
export const CreateOrderFileActions = Creators

export interface CreateOrderFileState {
    data: OrderFile | null,
    loading: boolean,
    error: string | null
}

export interface CreateOrderFileRequestAction {
    postData: PostData,
    error: string | null,
    onSuccess?: (data:OrderFile) => void,
    onFailure?: () => void
}

interface CreateOrderFileSuccessAction {
    data: OrderFile
}

interface CreateOrderFileFailureAction {
    error: string
}

const INITIAL_STATE: CreateOrderFileState = {
    data: null,
    loading: false,
    error: null
}

const _request = (state: CreateOrderFileState) =>
    update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: CreateOrderFileState, action: CreateOrderFileSuccessAction) =>
    update(state, {
        loading: { $set: false },
        data: { $set: action.data }
    });

const _failure = (state: CreateOrderFileState, action: CreateOrderFileFailureAction) =>
    update(state, {
        loading: { $set: false },
        error: { $set: action.error }
    });

const _reset = () => INITIAL_STATE;

export const createOrderFiles = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset
})