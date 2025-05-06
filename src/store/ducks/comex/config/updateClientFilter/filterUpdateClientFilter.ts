import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";


const { Types, Creators } = createActions(
    {
      setFilterData: ['data'],
      reset: [],
    },
    {
      prefix: 'COMEX_UPDATE_CLIENT_FILTER_',
    }
  );
export interface UpdateClientFilter {

  client: string | null;
}

export const UpdateClientFilterTypes = Types;
export const UpdateClientFilterActions = Creators;

interface UpdateClientFilterState {
  data: UpdateClientFilter;
}

interface SetFilterData {
  data: UpdateClientFilter;
}

const INITIAL_STATE: UpdateClientFilterState = {
  data: {
    client: null,
  }
};

const setFilterData = (state: UpdateClientFilterState, action: SetFilterData) =>
  update(state, {
    data: { $set: action.data },
});

const reset = () => INITIAL_STATE;

export const updateClientFilterData = createReducer(INITIAL_STATE, {
    [Types.SET_FILTER_DATA]: setFilterData,
    [Types.RESET]: reset,
});