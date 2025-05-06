import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { SortingParams } from "contracts";
import moment from "moment";
import "moment/locale/pt-br";
import { format } from 'date-fns';

const { Types, Creators } = createActions(
    {
      setFilterData: ['data'],
      reset: [],
    },
    {
      prefix: 'SNAPSHOT_DIVERGENT_FILTER_',
    }
  );

export interface ISnapshotDivergentFilter extends SortingParams {
  limit: number | undefined;
  page: number;

  company_id: string | null; 
  product_id: string | null;
  storage_location_id: string | null;
  batch: string | null;
  justification_id: string | null;
  date: string | null;

}

export const SnapshotDivergentFilterTypes = Types;
export const SnapshotDivergentFilterActions = Creators;

interface SnapshotDivergentFilterState {
  data: ISnapshotDivergentFilter;
}

interface SetFilterData {
  data: any;
}

const defaultDate =
  moment().hours() < 13
    ? moment().locale("pt-br").subtract(1, "days").format("YYYY-MM-DD")
    : moment().locale("pt-br").format("YYYY-MM-DD");

const INITIAL_STATE: SnapshotDivergentFilterState = {
  data: {
    limit: 5,
    page: 1,
    company_id: null,
    product_id: null,
    storage_location_id: null,
    batch: null,
    justification_id: null,
    date: format(new Date(defaultDate + " 00:00"), "yyyy-MM-dd"),
  }
};

const setFilterData = (state: SnapshotDivergentFilterState, action: SetFilterData) =>
  update(state, {
    data: { $set: action.data },
});

const reset = () => INITIAL_STATE;

export const snapshotDivergentFilterData = createReducer(INITIAL_STATE, {
    [Types.SET_FILTER_DATA]: setFilterData,
    [Types.RESET]: reset,
});