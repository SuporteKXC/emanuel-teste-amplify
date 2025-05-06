import type { SortingParams } from 'contracts/Common';
import type { PaginationParams } from 'contracts/Pagination';
import update from 'immutability-helper';
import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    updateCache: ['paginationKey', 'paginationParams'],
    deleteCache: ['paginationKey'],
    reset: [],
  },
  { prefix: 'PAGINATION_CACHE_' }
);

export interface PaginationCacheState {
  data: PaginationParams;
}

interface UpdateCacheAction {
  paginationKey: string;
  paginationParams: SortingParams;
}

interface DeleteCacheAction {
  paginationKey: string;
}

const INITIAL_STATE: PaginationCacheState = {
  data: {},
};

const updateCache = (state: PaginationCacheState, action: UpdateCacheAction) =>
  update(state, {
    data: {
      $apply: (currentData: PaginationParams) => {
        const { paginationKey, paginationParams } = action;
        const keyExists = currentData[paginationKey] !== undefined;

        if (!keyExists) {
          return { ...currentData, [paginationKey]: paginationParams };
        }

        return {
          ...currentData,
          [paginationKey]: {
            ...currentData[paginationKey],
            ...paginationParams,
          },
        };
      },
    },
  });

const deleteCache = (state: PaginationCacheState, action: DeleteCacheAction) =>
  update(state, {
    data: {
      $apply: (currentData: PaginationParams) => {
        delete currentData?.[action.paginationKey];
        return currentData;
      },
    },
  });

const reset = (state: PaginationCacheState) => {
  return update(state, {
    data: { $set: {} },
  });
};

export const paginationParamsCache = createReducer(INITIAL_STATE, {
  [Types.UPDATE_CACHE]: updateCache,
  [Types.DELETE_CACHE]: deleteCache,
  [Types.RESET]: reset,
});

export const PaginationParamsCacheTypes = Types;
export const PaginationParamsCacheActions = Creators;
