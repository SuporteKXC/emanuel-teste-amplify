import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { IState, ISuccessAction, IFailureAction } from "interfaces/list-duck";
import { ICity } from "interfaces/city";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess"],
    success: ["data"],
    failure: ["error"],
    reset: [],
  },
  { prefix: "LIST_CITIES_" }
);

export interface ListCitiesState extends IState {
  data: ICity[];
}

interface ISuccessListUnitsAction extends ISuccessAction {
  data: ICity[];
}

const INITIAL_STATE: ListCitiesState = {
  data: [],
  loading: false,
  error: null,
};

const request = (state: ListCitiesState) =>
  update(state, {
    loading: { $set: true },
    error: { $set: null },
  });

const success = (state: ListCitiesState, action: ISuccessListUnitsAction) =>
  update(state, {
    data: { $set: action.data },
    loading: { $set: false },
  });

const failure = (state: ListCitiesState, action: IFailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const reset = () => INITIAL_STATE;

export const listCities = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const ListCitiesTypes = Types;
export const ListCitiesActions = Creators;
