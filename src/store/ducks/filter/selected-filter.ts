import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

const { Types, Creators } = createActions(
  {
    success: ["data"],
    reset: [],
  },
  { prefix: "SELECTED_FILTER_" }
);

export interface SelectedFilterState {
  data: any | null;
}

interface SuccessSelectedFilter {
  data: any;
}

const INITIAL_STATE: SelectedFilterState = {
  data: null,
};

const success = (state: SelectedFilterState, action: SuccessSelectedFilter) =>
  update(state, {
    data: { $set: action.data },
  });

const reset = () => INITIAL_STATE;

export const selectedFilter = createReducer(INITIAL_STATE, {
  [Types.SUCCESS]: success,
  [Types.RESET]: reset,
});

export const SelectedFilterTypes = Types;
export const SelectedFilterActions = Creators;
