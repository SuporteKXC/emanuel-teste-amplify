import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { CompanyOption } from "interfaces/company";

const { Types, Creators } = createActions(
  {
    success: ["data"],
    reset: [],
  },
  { prefix: "SELECTED_COMPANY_" }
);

export interface SelectedCompanyState {
  data: CompanyOption | null;
}

interface SuccessSelectedCompany {
  data: CompanyOption;
}

const INITIAL_STATE: SelectedCompanyState = {
  data: null,
};

const success = (state: SelectedCompanyState, action: SuccessSelectedCompany) =>
  update(state, {
    data: { $set: action.data },
  });

const reset = () => INITIAL_STATE;

export const selectedCompany = createReducer(INITIAL_STATE, {
  [Types.SUCCESS]: success,
  [Types.RESET]: reset,
});

export const SelectedCompanyTypes = Types;
export const SelectedCompanyActions = Creators;
