import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "contracts/trackingDelivery/list-duck";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_DISTANCE_" }
);

export interface ListDistanceState extends IState {}

const INITIAL_STATE: ListDistanceState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListDistanceState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListDistanceState, action: ISuccessAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListDistanceState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listDistance = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListDistanceTypes = Types;
export const ListDistanceActions = Creators;
