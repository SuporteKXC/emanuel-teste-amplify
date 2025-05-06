import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

const { Types, Creators } = createActions(
  {
    request: ["id", "postData", "onSuccess", "onFailure"],
    success: [],
    failure: ["errorMessage"],
    reset: [],
  },
  {
    prefix: "COMEX_UPDATE_ALERT_TYPE_",
  }
);

export interface UpdateAlertTypeState {
  loading: boolean;
  errorMessage: string | null;
}

export interface UpdateAlertTypeRequestAction {
  id: number;
  postData: {
    description: string;
    details: string;
    roles: string[];
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}

interface UpdateAlertTypeFailureAction {
  errorMessage: string;
  validationErrors?: any;
}

const INITIAL_STATE: UpdateAlertTypeState = {
  loading: false,
  errorMessage: null,
};

const request = (state: UpdateAlertTypeState) =>
  update(state, {
    loading: { $set: true },
    errorMessage: { $set: null },
  });

const success = (state: UpdateAlertTypeState) =>
  update(state, {
    loading: { $set: false },
  });

const failure = (
  state: UpdateAlertTypeState,
  action: UpdateAlertTypeFailureAction
) =>
  update(state, {
    loading: { $set: false },
    errorMessage: { $set: action.errorMessage },
  });

const reset = () => INITIAL_STATE;

export const updateAlertType = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
  [Types.RESET]: reset,
});

export const UpdateAlertTypeTypes = Types;
export const UpdateAlertTypeActions = Creators;
