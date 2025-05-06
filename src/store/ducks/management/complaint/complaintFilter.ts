import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { SortingParams } from "contracts";

const { Types, Creators } = createActions(
  {
    setFilterData: ["data"],
    reset: [],
  },
  {
    prefix: "COMPLAINT_FILTER_",
  }
);

export interface IComplaintFilter extends SortingParams {
  limit: number | undefined;
  page: number;
  complaintResponsible: number | null;
  complaintType: number | null;
  dtEndProcess: string | null;
  dtStartProcess: string | null;
  impactedArea: number | null;
}

export const ComplaintFilterTypes = Types;
export const ComplaintFilterActions = Creators;

interface ComplaintFilterState {
  data: IComplaintFilter;
}

interface SetFilterData {
  data: any;
}

const INITIAL_STATE: ComplaintFilterState = {
  data: {
    limit: 10,
    page: 1,
    complaintResponsible: null,
    complaintType: null,
    dtEndProcess: null,
    dtStartProcess: null,
    impactedArea: null,
  },
};

const setFilterData = (state: ComplaintFilterState, action: SetFilterData) =>
  update(state, {
    data: { $set: action.data },
  });

const reset = () => INITIAL_STATE;

export const complaintFilterData = createReducer(INITIAL_STATE, {
  [Types.SET_FILTER_DATA]: setFilterData,
  [Types.RESET]: reset,
});
