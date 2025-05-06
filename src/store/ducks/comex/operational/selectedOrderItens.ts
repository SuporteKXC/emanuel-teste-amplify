import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

// Define action types and creators
const { Types, Creators } = createActions(
  {
    addSelectedId: ['id','po'],
    removeSelectedId: ['id','po'],
    clearSelectedIds: [],
  },
  {
    prefix: 'ORDER_ITEM_SELECTED_IDS_',
  }
);

export const SelectedIdsTypes = Types;
export const SelectedIdsActions = Creators;

// Define the state interface
interface SelectedIdsState {
  ids: string[];
  pos: string[];
}

// Initial state
const INITIAL_STATE: SelectedIdsState = {
  ids: [],
  pos: []
};

// Reducer functions
const addSelectedId = (state: SelectedIdsState, { id,po }: { id: string, po:string }) =>
  update(state, {
    ids: { $push: [id] },
    pos: { $push: [po]}
  });

const removeSelectedId = (state: SelectedIdsState, { id,po }: { id: string, po:string }) =>
  update(state, {
    ids: { $apply: (ids: string[]) => ids.filter(existingId => existingId !== id) },
    pos: { $apply: (pos: string[]) => pos.filter(existingId => existingId !== po) }
  });

const clearSelectedIds = (state: SelectedIdsState) =>
  update(state, {
    ids: { $set: [] },
    pos: { $set: [] }
  });

export const orderItemSelectedIdsReducer = createReducer(INITIAL_STATE, {
  [Types.ADD_SELECTED_ID]: addSelectedId,
  [Types.REMOVE_SELECTED_ID]: removeSelectedId,
  [Types.CLEAR_SELECTED_IDS]: clearSelectedIds,
});