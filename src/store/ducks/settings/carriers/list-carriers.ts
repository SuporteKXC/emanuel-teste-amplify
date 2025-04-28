import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { Carrier } from "interfaces/carrier";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_Carriers_" }
);

export interface ListCarriersState extends IState {
  data: Carrier[];
}

interface ISuccessListUnitsAction extends ISuccessAction {
  data: Carrier[];
}

const INITIAL_STATE: ListCarriersState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListCarriersState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListCarriersState, action: ISuccessListUnitsAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListCarriersState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listCarriers = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListCarriersTypes = Types;
export const ListCarriersActions = Creators;
