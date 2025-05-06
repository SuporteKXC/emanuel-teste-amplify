FROM node:20.10.0 AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .
COPY .env.production .env.production

RUN yarn build

RUN ls -R /app

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

ENV VITE_NODE_ENV='production'
ENV VITE_API_IFF_BRAZIL_INVOICE_IMPORT='https://iff-import-brazil-invoice.webcol.systems/api/v1/'
ENV VITE_API_IMPORT_URL='https://iff-import-brazil-invoice.webcol.systems/api/v1/'
ENV VITE_API_UPLOAD_VOUCHER_URL='https://geolocation.iff.webcol.systems/'
ENV VITE_API_URL='https://webcol-comex-iff-api.webcol.systems/'
ENV VITE_APP_URL_GEOLOCATION='https://webcol-import-status-7fc4d5838553.herokuapp.com/'
ENV VITE_COMEX_CLIENT='Webcol - IFF'
ENV VITE_COMEX_EXPORT_API='https://iff-export-api.webcol.systems'
ENV VITE_LOGO_MENU_SIZE='md'
ENV VITE_LOGO_MENU_URL='https://iff.webcol.systems/images/logo-iff.svg'
ENV VITE_STOCKS_API_URL='https://iff-stocks-management-2caa4f37c332.herokuapp.com//api/v1/'

CMD ["nginx", "-g", "daemon off;"]
