import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { Country, ListedCountry, SelectOption } from "contracts";

const { Types, Creators } = createActions(
  {
    request: ["query", "onSuccess", "onFailure"],
    success: ["data", "defaultOption", "options"],
    failure: ["errorMessage"],
    softReset: [],
    reset: [],
  },
  {
    prefix: "LIST_COUNTRIES_",
  }
);

export interface ListCountriesState {
  data: ListedCountry[];
  defaultOption?: SelectOption | null;
  options: SelectOption[];
  loading: boolean;
  errorMessage: string | null;
}

export interface ListCountriesRequestAction {
  query?: Record<string, any>;
  onSuccess?: (data: Country) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: ListedCountry[];
}

interface FailureAction {
  errorMessage: string;
}

const INITIAL_STATE: ListCountriesState = {
  data: [],
  options: [],
  loading: false,
  errorMessage: null,
  defaultOption: null,
};

const request = (state: ListCountriesState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: ListCountriesState, action: SuccessAction) => {
  const countriesOptions = action.data?.map(({ description }) => ({
    label: description,
    value: description,
  }));
  
  const defaultOption = countriesOptions.find(
    ({ value }) => value === "BRASIL"
  );

  return update(state, {
    loading: { $set: false },
    data: { $set: action.data },
    defaultOption: { $set: defaultOption },
    options: { $set: countriesOptions },
  });
};

const failure = (state: ListCountriesState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const softReset = (state: ListCountriesState) =>
  update(state, {
    loading: { $set: false },
  });

const reset = (state: ListCountriesState) =>
  update(state, {
    loading: { $set: false },
    data: { $set: [] },
    defaultOption: { $set: null },
  });

export const listCountries = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.SOFT_RESET]: softReset,
  [Types.RESET]: reset,
});

export const ListCountriesTypes = Types;
export const ListCountriesActions = Creators;
