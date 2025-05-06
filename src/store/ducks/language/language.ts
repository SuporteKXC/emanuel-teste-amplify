import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

export interface LanguageState {
  language: string;
}

export interface SetLanguageAction {
  language: string;
}

const { Types, Creators } = createActions(
  {
    setLanguage: ["language"],
    reset: [],
  },
  { prefix: "LANGUAGE_" }
);

const INITIAL_STATE: LanguageState = {
  language: "pt",
};

const setLanguage = (state: LanguageState, action: SetLanguageAction) =>
  update(state, {
    language: { $set: action.language },
  });

const reset = () => INITIAL_STATE;

export const language = createReducer(INITIAL_STATE, {
  [Types.SET_LANGUAGE]: setLanguage,
  [Types.RESET]: reset,
});

export const LanguageTypes = Types;
export const LanguageActions = Creators;
