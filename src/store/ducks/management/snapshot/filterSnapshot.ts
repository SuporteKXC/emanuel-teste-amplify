import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { SortingParams } from "contracts";
import moment from "moment";
import { format } from "date-fns";

const { Types, Creators } = createActions(
  {
    setFilterData: ["data"],
    reset: [],
  },
  {
    prefix: "SNAPSHOT_FILTER_",
  }
);

export interface ISnapshotFilter extends SortingParams {
  limit: number | undefined;
  page: number;

  company_id: string | null;
  product_id: string | null;
  storage_location_id: string | null;
  batch: string | null;
  date: string | null;
  status: string | null
}

export const SnapshotFilterTypes = Types;
export const SnapshotFilterActions = Creators;

interface SnapshotFilterState {
  data: ISnapshotFilter;
}

interface SetFilterData {
  data: any;
}

const defaultDate =
  moment().hours() < 12
    ? moment().locale("pt-br").subtract(1, "days").format("YYYY-MM-DD")
    : moment().locale("pt-br").format("YYYY-MM-DD");

const INITIAL_STATE: SnapshotFilterState = {
  data: {
    limit: 5,
    page: 1,
    company_id: null,
    product_id: null,
    storage_location_id: null,
    batch: null,
    status: null,
    date: format(new Date(defaultDate + " 00:00"), "yyyy-MM-dd"),
  },
};

const setFilterData = (state: SnapshotFilterState, action: SetFilterData) =>
  update(state, {
    data: { $set: action.data },
  });

const reset = () => INITIAL_STATE;

export const snapshotFilterData = createReducer(INITIAL_STATE, {
  [Types.SET_FILTER_DATA]: setFilterData,
  [Types.RESET]: reset,
});
