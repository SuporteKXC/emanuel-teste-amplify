import { eventBus } from "services";

type ErrorPayload = {
  errorMessage: string;
  validationErrors?: Record<string, any>[];
  errorCode?: string;
};

const analyseError = (errorCode: string): void => {
  const CRITICAL_ERRORS: string[] = ["E_TOKEN_REVOKED"];
  if (CRITICAL_ERRORS.includes(errorCode)) {
    eventBus.dispatch("logoutUser");
  }
};

export const requestErrorHandler = (error: any | Error): ErrorPayload => {
  if (error?.response?.data) {
    const { message, validationErrors = [], code } = error.response.data?.error;

    if (error.response.status === 401) {
      analyseError(code);
    }

    return {
      errorMessage: message || "Não foi possível realizar a sua requisição",
      validationErrors,
      errorCode: code,
    };
  }

  return {
    errorMessage: error.message || "Não foi possível realizar a sua requisição",
  };
};
