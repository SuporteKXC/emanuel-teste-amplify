import { store } from "@/store";
import { AuthActions } from "@/store/ducks";

type ErrorPayload = {
  errorMessage: string;
  validationErrors?: Record<string, any>[];
};

function parseErrorMessage(message: string, status: string): string {
  return message?.replace(`${status}:`, "").trim() || "";
}

export function apiErrorHandler(error: any | Error): ErrorPayload {
  if (error.code === "ERR_NETWORK") {
    console.log("ERR_NETWORK");
  }

  if(error?.response?.status == 401){
    store.dispatch(AuthActions.reset());
    return {
      errorMessage: "Faça o Login Novamente"
    }
  }

  if (error?.name === "AxiosError") {
    if (error?.response?.data?.errors?.length > 0) {
      return {
        errorMessage: error.response.data.errors[0].message,
      };
    }
  }

  if (error?.response?.data) {
    const { message, status, validationErrors } = error.response.data;
    
    if(validationErrors) {
      return {
        errorMessage:
          parseErrorMessage(message, status) ||
          "Erro ao executar sua requisição, acesso não autorizado",
        validationErrors: validationErrors
      };
    }

    return {
      errorMessage:
        parseErrorMessage(message, status) ||
        "Erro ao executar sua requisição, acesso não autorizado",
    };
  }

  return {
    errorMessage: error.message,
  };
}
