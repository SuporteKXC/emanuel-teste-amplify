import type { FindMany, SortingParams } from 'contracts/Common';
import { isEqual } from 'lodash';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { PaginationParamsCacheActions as Actions } from 'store/ducks/paginationCache';

interface SetStateFunction<T extends any = FindMany>
  extends Dispatch<SetStateAction<T>> {}

export const usePaginationCache = <T extends any = FindMany>(
  paginationKey: string
) => {
  const dispatch: AppDispatch = useDispatch();

  const { data } = useSelector(
    (state: RootState) => state.paginationParamsCache
  );

  const paginationCache = useMemo((): T | undefined => {
    if (!data[paginationKey]) {
      return undefined;
    }
    return data[paginationKey] as T;
  }, [data, paginationKey]);

  const updatePaginationCache = useCallback(
    (params: Record<string, any>, removeKeys: string[] = []): void => {
      removeKeys.push('dirty');

      removeKeys.forEach((key) => {
        if (params.hasOwnProperty(key)) {
          delete params[key];
        }
      });

      dispatch(Actions.updateCache(paginationKey, params));
    },
    [dispatch, paginationKey]
  );

  const deletePaginationCache = useCallback((): void => {
    dispatch(Actions.deleteCache(paginationKey));
  }, [dispatch, paginationKey]);

  const handleSort = useCallback(
    (
      oldState: SortingParams,
      newState: SortingParams,
      setState: SetStateFunction
    ): void => {
      const subjectA = {
        orderBy: oldState.orderBy,
        direction: oldState.direction,
      };

      const subjectB = {
        orderBy: newState?.orderBy,
        direction: newState?.direction,
      };

      if (!isEqual(subjectA, subjectB)) {
        setState((state) => ({ ...state, ...subjectB, page: 1 }));
      }
    },
    []
  );

  const handleFilter = useCallback(
    (
      oldState: FindMany,
      newState: FindMany,
      setState: SetStateFunction
    ): void => {
      const removeKeys = ['page', 'limit', 'orderBy', 'direction', 'dirty'];

      const oldSubject: any = { ...oldState };
      const newSubject: any = { ...newState };

      Object.keys(oldSubject).forEach((key) => {
        if (removeKeys.includes(key)) {
          delete oldSubject[key];
        }
      });

      Object.keys(newSubject).forEach((key) => {
        if (removeKeys.includes(key)) {
          delete newSubject[key];
        }
      });

      if (!isEqual(oldSubject, newSubject)) {
        setState((state) => ({ ...state, ...newSubject, page: 1 }));
      }
    },
    []
  );

  return {
    paginationCache,
    updatePaginationCache,
    deletePaginationCache,
    handleSort,
    handleFilter,
  };
};

export type PaginationCacheHook = ReturnType<typeof usePaginationCache>;
