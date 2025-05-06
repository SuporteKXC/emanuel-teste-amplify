import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { SortingParams } from "contracts";

const { Types, Creators } = createActions(
    {
      setFilterData: ['data'],
      reset: [],
    },
    {
      prefix: 'COMEX_PRODUCT_FILTER_',
    }
  );

export interface IProductFilter extends SortingParams {
  limit: number | undefined;
  page: number;

  code: number | null;
  description: string | null;
  responsible: number[] | null;
}

export const ProductFilterTypes = Types;
export const ProductFilterActions = Creators;

interface ProductFilterState {
  data: IProductFilter;
}

interface SetFilterData {
  data: any;
}

const INITIAL_STATE: ProductFilterState = {
  data: {
    limit: 10,
    page: 1,
    code: null,
    description: null,
    responsible: null
  }
};

const setFilterData = (state: ProductFilterState, action: SetFilterData) =>
  update(state, {
    data: { $set: action.data },
});

const reset = () => INITIAL_STATE;

export const productFilterData = createReducer(INITIAL_STATE, {
    [Types.SET_FILTER_DATA]: setFilterData,
    [Types.RESET]: reset,
});