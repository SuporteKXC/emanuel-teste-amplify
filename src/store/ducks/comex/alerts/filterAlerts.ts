import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { SortingParams } from "contracts";

const { Types, Creators } = createActions(
    {
      setFilterData: ['data'],
      reset: [],
    },
    {
      prefix: 'COMEX_ALERTS_FILTER_',
    }
  );

export interface IAlertsFilter extends SortingParams {
  company: Array<string> | null;
  alertTypes: Array<string> | null;
  po: string | null;
  poItem: string | null;
  responsible: string | null;
  read: '1' | '0' | null;
  alertDate: any;
  page: number;
  limit: number | null;
}

export const AlertsFilterTypes = Types;
export const AlertsFilterActions = Creators;

interface AlertsFilterState {
  data: IAlertsFilter;
}

interface SetFilterData {
  data: IAlertsFilter;
}

const INITIAL_STATE: AlertsFilterState = {
  data: {
    company: null,
    alertTypes: null,
    po: null,
    poItem: null,
    responsible: null,
    read: null,
    alertDate: null,
    page: 1,
    limit: 10000
  }
};

const setFilterData = (state: AlertsFilterState, action: SetFilterData) =>
  update(state, {
    data: { $set: action.data },
});

const reset = () => INITIAL_STATE;

export const alertsFilter = createReducer(INITIAL_STATE, {
    [Types.SET_FILTER_DATA]: setFilterData,
    [Types.RESET]: reset,
});