import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";


const { Types, Creators } = createActions(
    {
      request: ['params','onSuccess','onFailure'],
      success: ['countries'],
      failure: ['error'],
      setCountry: ['currentCountry'],
      reset: [],
    },
    {
      prefix: '_COUNTRY_',
    }
  );

export const CountryTypes = Types;
export const CountryActions = Creators;

export interface CountryState {
    countries: any[]
    currentCountry: string | null
    loading: boolean;
    error: string | null;
  }
export interface CountryRequestAction {
    currentCountry: string
    countries: any[];
    error: string | null;
    onSuccess?: (countries: any[]) => void;
    onFailure?: () => void;
  }

interface SuccessAction {
    countries: any[];
    currentCountry: string
    loading: boolean;
}
interface FailureAction {
  error: string;
  loading: boolean;
}
const INITIAL_STATE: CountryState = {
  countries: [],
  currentCountry: null,
  loading: false,
  error: null,
};

const _request = (state: CountryState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state:CountryState, action:SuccessAction) => 
  update(state, {
    loading: { $set: false },
    countries: { $set: action.countries }
  });

const _failure = (state:CountryState, action:FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _setCountry = (state:CountryState, action:SuccessAction) =>
    update(state, {
      currentCountry: { $set: action.currentCountry.toUpperCase() }
  });
  

const _reset = () => INITIAL_STATE;

export const country = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.SET_COUNTRY]: _setCountry,
    [Types.RESET]: _reset,
  });