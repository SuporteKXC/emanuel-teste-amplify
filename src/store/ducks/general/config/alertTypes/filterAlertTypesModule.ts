import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
// import { SortingParams } from "contracts";

const { Types, Creators } = createActions(
    {
      setFilterData: ['data'],
      reset: [],
    },
    {
      prefix: 'FILTER_ALERT_TYPE_MODULE_',
    }
  );

export interface IAlertTypeModuleFilter {
  label: string;
  value: number;
}

export const AlertTypeModuleFilterTypes = Types;
export const AlertTypeModuleFilterActions = Creators;

interface AlertTypeModuleFilterState {
  data: IAlertTypeModuleFilter | null;
}

interface SetFilterData {
  data: any;
}

const INITIAL_STATE: AlertTypeModuleFilterState = {
  data: null
};

const setFilterData = (state: AlertTypeModuleFilterState, action: SetFilterData) =>
  update(state, {
    data: { $set: action.data },
});

const reset = () => INITIAL_STATE;

export const alertTypeModuleId = createReducer(INITIAL_STATE, {
    [Types.SET_FILTER_DATA]: setFilterData,
    [Types.RESET]: reset,
});