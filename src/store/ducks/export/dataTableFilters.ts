import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

// Define action types and creators
const { Types, Creators } = createActions(
  {
    addFilters: ["filter"],
  },
  {
    prefix: "DATATABLE_FILTER_",
  }
);

export const DatatableFilterTypes = Types;
export const DatatableFilterActions = Creators;

// Define the state interface
interface DatatableFilterState {
  filter: any[];
}

// Initial state
const INITIAL_STATE: DatatableFilterState = {
  filter: [],
};

// Reducer functions
const addFilters = (
  state: DatatableFilterState,
  { filter }: { filter: any[] }
) =>
 update(state, {
    filter: { $set: filter },
  });

export const datatableFilterReducer = createReducer(INITIAL_STATE, {
  [Types.ADD_FILTERS]: addFilters,
});
