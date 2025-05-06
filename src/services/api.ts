import axios from "axios";
const env = import.meta.env;

const environment = {
  local: {
    api: env.VITE_API_URL,
    apiStocks: env.VITE_STOCKS_API_URL,
    apiImport: env.VITE_API_IMPORT_URL,
    apiUploadVoucher: env.VITE_API_UPLOAD_VOUCHER_URL,
    apiInvoiceImport: process.env.VITE_API_IFF_BRAZIL_INVOICE_IMPORT as string,
    apiComexExport: env.VITE_COMEX_EXPORT_API,
    apiGeolocation: process.env.VITE_APP_URL_GEOLOCATION as string,
  },
  production: {
    api: env.VITE_API_URL,
    apiStocks: env.VITE_STOCKS_API_URL,
    apiImport: env.VITE_API_IMPORT_URL,
    apiUploadVoucher: env.VITE_API_UPLOAD_VOUCHER_URL,
    apiInvoiceImport: process.env.VITE_API_IFF_BRAZIL_INVOICE_IMPORT as string,
    apiGeolocation: process.env.VITE_APP_URL_GEOLOCATION as string,
    apiComexExport: env.VITE_COMEX_EXPORT_API,
  },
};
const baseURL =
  env.VITE_NODE_ENV === "development"
    ? environment.local
    : environment.production;

export const dashboardUrl = `https://webcol-dashboard-b6c241cd5fb6.herokuapp.com`;

export const apiDashboard = axios.create({
  baseURL: dashboardUrl,
  headers: {},
  withCredentials: true,
});

export const showProductionApiAlert =
  env.VITE_NODE_ENV === "development" && baseURL === environment.production;

export const api = axios.create({
  baseURL: baseURL.api,
  headers: {},
  withCredentials: true,
});

export const apiStocks = axios.create({
  baseURL: baseURL.apiStocks,
});

export const apiImport = axios.create({
  baseURL: baseURL.apiImport,
});

export const apiUploadVoucher = axios.create({
  baseURL: baseURL.apiUploadVoucher,
});

export const apiGeolocation = axios.create({
  baseURL: baseURL.apiGeolocation,
});

export const apiInvoiceImport = axios.create({
  baseURL: baseURL.apiInvoiceImport,
});

export const apiComexExport = axios.create({
  baseURL: baseURL.apiComexExport,
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
