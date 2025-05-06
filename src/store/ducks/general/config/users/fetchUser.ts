import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import type { UserData, RoleData, CompanyData } from "contracts";
import type { ResponsibleData } from "contracts";
import { SupplierData } from "contracts/comex/Supplier";
import { UserSecondaryEmailData } from "contracts/comex/UserSecondaryEmail";

const { Types, Creators } = createActions(
  {
    request: ['id','onSuccess','onFailure'],
    success: ['data'],
    failure: ['error'],
    reset: [],
  },
  {
    prefix: 'USERS_FETCH_',
  }
);

export const FetchUserTypes = Types;
export const FetchUserActions = Creators;

interface IUserData extends UserData {
  user_roles: {
    role: RoleData
  }[];
  user_company: {
    company: CompanyData
  }[];
  user_responsibles: {
    responsible: ResponsibleData
  }[];
  user_suppliers: {
    supplier: SupplierData
  }[];
  user_carrier: any[]
  user_client: any[]
  secondary_emails: UserSecondaryEmailData[]
  countries: any[]
}

export interface FetchUserState {
  data: IUserData | null;
  loading: boolean;
  error: string | null;
}

export interface FetchUserRequestAction {
  id: number;
  error: string | null;
  onSuccess?: (data: UserData) => void;
  onFailure?: () => void;
}

interface SuccessAction {
  data: IUserData;
}

interface FailureAction {
  error: string;
}

const INITIAL_STATE: FetchUserState = {
  data: null,
  loading: false,
  error: null,
};

const _request = (state:FetchUserState) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

const _success = (state: FetchUserState, action: SuccessAction) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data }
  });

const _failure = (state: FetchUserState, action: FailureAction) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

const _reset = () => INITIAL_STATE;

export const user = createReducer(INITIAL_STATE, {
    [Types.REQUEST]: _request,
    [Types.SUCCESS]: _success,
    [Types.FAILURE]: _failure,
    [Types.RESET]: _reset,
  });