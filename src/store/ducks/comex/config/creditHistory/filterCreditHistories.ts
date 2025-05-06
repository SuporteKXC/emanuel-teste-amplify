import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { SortingParams } from "contracts";

const { Types, Creators } = createActions(
    {
      setFilterData: ['data'],
      reset: [],
    },
    {
      prefix: 'COMEX_CREDIT_HISTORIES_FILTER_',
    }
  );

export interface ICreditHistoryFilter extends SortingParams {
  limit: number | undefined;
  page: number;

  username: string | null;
  dateInicio: string | null;
  dateFim: string | null;
}

export const CreditHistoriesFilterTypes = Types;
export const CreditHistoriesFilterActions = Creators;

interface CreditHistoriesFilterState {
  data: ICreditHistoryFilter;
}

interface SetFilterData {
  data: ICreditHistoryFilter;
}

const INITIAL_STATE: CreditHistoriesFilterState = {
  data: {
    limit: 10,
    page: 1,
    username: null,
    dateInicio: null,
    dateFim: null
  }
};

const setFilterData = (state: CreditHistoriesFilterState, action: SetFilterData) =>
  update(state, {
    data: { $set: action.data },
});

const reset = () => INITIAL_STATE;

export const creditHistoriesFilterData = createReducer(INITIAL_STATE, {
    [Types.SET_FILTER_DATA]: setFilterData,
    [Types.RESET]: reset,
});