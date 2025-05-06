import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { SortingParams } from "contracts";
import { format, subDays } from "date-fns";

const { Types, Creators } = createActions(
    {
      setFilterData: ['data'],
      reset: [],
    },
    {
      prefix: 'COMEX_OPERATIONAL_FILTER_',
    }
  );

export interface IOperationalFilter extends SortingParams {
  limit: number | undefined;
  page: number;

  company: Array<string> | null;
  statusProcess: Array<string> | null;
  processType: Array<string> | null;
  responsible: Array<number> | null;
  urgent: string | null; 
  inProgress: string | null;
  channel: string | null;
  userSupplier: number | null;
  modal: string | null;
  
  po: string | null;
  customerPo: string | null;
  poItem: string | null;
  product: string | null;
  shipper: string | null;
  destinationPlant: string | null;
  canceled: boolean;
  criticalProcess: boolean;
  justification: boolean

  ataStart: string | null;
  AtaEnd: string | null;
  grActualStart: string | null;
  grActualEnd: string | null;
  registerDateStart: string | null;
  registerDateEnd: string | null;
  customsBrokerProcess: string | null;
}

export const OperationalFilterTypes = Types;
export const OperationalFilterActions = Creators;

interface OperationalFilterState {
  data: IOperationalFilter;
}

interface SetFilterData {
  data: any;
}

const INITIAL_STATE: OperationalFilterState = {
  data: {
    limit: 10,
    page: 1,
    company: null,
    customerPo: null,
    statusProcess: null,
    processType: null,
    urgent: null,
    inProgress: null,
    channel: null,
    justification: false,
    modal: null,
    po: null,
    poItem: null,
    product: null,
    shipper: null,
    responsible: null,
    destinationPlant: null,
    canceled: false,
    criticalProcess: false,
    ataStart: null,
    AtaEnd: null,
    grActualStart: null,
    grActualEnd: null,
    userSupplier: null,
    // registerDateStart: format(subDays(new Date(),180),'yyyy-MM-dd'),
    // registerDateEnd: format(new Date(),'yyyy-MM-dd'),
    registerDateStart: null,
    registerDateEnd: null,
  }
};

const setFilterData = (state: OperationalFilterState, action: SetFilterData) =>
  update(state, {
    data: { $set: action.data },
});

const reset = () => INITIAL_STATE;

export const operationalFilterData = createReducer(INITIAL_STATE, {
    [Types.SET_FILTER_DATA]: setFilterData,
    [Types.RESET]: reset,
});