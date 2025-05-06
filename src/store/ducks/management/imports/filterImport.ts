import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { SortingParams } from "contracts";
import moment from "moment";
import { format, subDays } from "date-fns";

const { Types, Creators } = createActions(
  {
    setFilterData: ["data"],
    reset: [],
  },
  {
    prefix: "IMPORT_FILTER_",
  }
);

export interface IImportFilter extends SortingParams {
  limit: number | undefined;
  page: number;

  companyId: string | null;
  productId: string | null;
  storageLocationId: string | null;
  status: string | null;
  plantDeliveryDateStart: string | null;
  plantDeliveryDateEnd: string | null;
  
}

export const ImportFilterTypes = Types;
export const ImportFilterActions = Creators;

interface ImportFilterState {
  data: IImportFilter;
}

interface SetFilterData {
  data: any;
}

const defaultDate = moment().locale("pt-br").format("YYYY-MM-DD")
  // moment().hours() < 12
  //   ? moment().locale("pt-br").subtract(1, "days").format("YYYY-MM-DD")
  //   : moment().locale("pt-br").format("YYYY-MM-DD");

const INITIAL_STATE: ImportFilterState = {
  data: {
    limit: 5,
    page: 1,
    companyId: null,
    productId: null,
    storageLocationId: null,
    status: null,
    plantDeliveryDateStart: format(subDays(new Date(defaultDate + " 00:00"), 365), "yyyy-MM-dd"),
    plantDeliveryDateEnd: format(new Date(defaultDate + " 00:00"), "yyyy-MM-dd"),
  },
};

const setFilterData = (state: ImportFilterState, action: SetFilterData) =>
  update(state, {
    data: { $set: action.data },
  });

const reset = () => INITIAL_STATE;

export const importFilterData = createReducer(INITIAL_STATE, {
  [Types.SET_FILTER_DATA]: setFilterData,
  [Types.RESET]: reset,
});
