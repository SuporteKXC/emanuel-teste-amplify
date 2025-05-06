type ErrorPayload = {
  errorMessage: string;
  validationErrors?: Record<string, any>[];
};

function parseErrorMessage(message: string, code: string): string {
  return message?.replace(`${code}:`, '').trim() || '';
}

export function apiErrorHandler(error: any | Error): ErrorPayload {
  if (error?.response?.data) {
    const { message, validationErrors = [], code } = error.response.data;

    return {
      errorMessage: parseErrorMessage(message, code) || 'Erro ao executar sua requisição',
      validationErrors,
    };
  }

  return {
    errorMessage: error.message,
  };
}
