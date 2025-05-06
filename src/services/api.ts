import axios from 'axios';

const environment = {
  local: {
    api: 'http://localhost:3333/dashboard',
  },
  homolog: {
    api: process.env.REACT_APP_BASE_API_HOMOLOG as string,
  },
  production: {
    api: process.env.REACT_APP_BASE_API as string,
  },
};

const getBaseURL = () => {
  if (process.env.NODE_ENV === 'development') {
    return environment.local;
  }

  if (window.location.hostname === 'webcol-gt-homolog.herokuapp.com') {
    return environment.homolog;
  }

  return environment.production;
};

const baseURL = getBaseURL();

export const showProductionApiAlert =
  process.env.NODE_ENV === 'development' && baseURL === environment.production;

export const showPHomologAlert = baseURL === environment.homolog;

export const api = axios.create({
  baseURL: baseURL.api,
  headers: {},
});

export const applyQueryString = (
  url: string,
  payload: Record<string, any>
): string => {
  const validObject: Record<string, any> = {};

  delete payload.dirty;

  for (const [param, value] of Object.entries(payload)) {
    if (value) Object.assign(validObject, { [param]: value });
  }

  if (Object.keys(validObject).length === 0) {
    return url;
  }

  const searchParams = new URLSearchParams(validObject).toString();

  return `${url}?${searchParams}`;
};

export const formDataBuilder = (payload: Record<string, any>): FormData => {
  const formData = new FormData();

  for (const [param, value] of Object.entries(payload)) {
    if (value instanceof File) {
      formData.append(param, value, value.name);
    } else if (value instanceof FileList) {
      for (let i = 0; i < value.length; i++) {
        formData.append(`${param}[]`, value[i], value[i].name);
      }
    } else if (value) {
      formData.append(param, value);
    }
  }

  return formData;
};
