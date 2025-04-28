import axios from 'axios';

const environment = {
  local: {
    apiGeneral: process.env.REACT_APP_URL_BASE_LOCAL as string,
    apiWms: process.env.REACT_APP_URL_WMS as string,
  },
  production: {
    apiWms: process.env.REACT_APP_URL_WMS as string,
    apiGeneral: process.env.REACT_APP_URL_BASE as string,
  },
};

const baseURL =
  process?.env?.NODE_ENV === 'development'
    ? environment.local
    : environment.production;

export const apiGeneral = axios.create({
  baseURL: baseURL.apiGeneral,
});

export const apiWms = axios.create({
  baseURL: baseURL.apiWms
})
export const queryBuilder = (payload: Record<string, any>): string => {
  const validObject: Record<string, any> = {};

  for (const [param, value] of Object.entries(payload)) {
    if (value) Object.assign(validObject, { [param]: value });
  }

  const searchParams = new URLSearchParams(validObject).toString();
  return searchParams;
};

export const formDataBuilder = (payload: Record<string, any>): FormData => {
  const formData = new FormData();

  for (const [param, value] of Object.entries(payload)) {
    if (value instanceof File) {
      formData.append(param, value, value.name);
    } else if (value) {
      formData.append(param, value);
    }
  }

  return formData;
};
