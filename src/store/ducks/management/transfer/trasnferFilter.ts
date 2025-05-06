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
    prefix: "TRANSFER_FILTER_",
  }
);

export interface ITransferFilter extends SortingParams {
  limit: number | undefined;
  page: number;
  companyId: string | null;
  productId: string | null;
  storageLocationId: string | null;
  status: string | null
  batch: string | null;
  startDate: string | null;
  endDate: string | null;
}

export const TransferFilterTypes = Types;
export const TransferFilterActions = Creators;

interface TransferFilterState {
  data: ITransferFilter;
}

interface SetFilterData {
  data: any;
}

const defaultDate =
  moment().hours() < 12
    ? moment().locale("pt-br").subtract(1, "days").format("YYYY-MM-DD")
    : moment().locale("pt-br").format("YYYY-MM-DD");

const INITIAL_STATE: TransferFilterState = {
  data: {
    limit: 5,
    page: 1,
    companyId: null,
    productId: null,
    storageLocationId: null,
    batch: null,
    status: null,
    startDate: defaultDate.toString(),
    endDate: defaultDate.toString()
  },
};

const setFilterData = (state: TransferFilterState, action: SetFilterData) =>
  update(state, {
    data: { $set: action.data },
  });

const reset = () => INITIAL_STATE;

export const transferFilterData = createReducer(INITIAL_STATE, {
  [Types.SET_FILTER_DATA]: setFilterData,
  [Types.RESET]: reset,
});
