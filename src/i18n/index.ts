import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import generalPt from "./locales/pt/general.json";
import generalEn from "./locales/en/general.json";
import generalEs from "./locales/es/general.json";
import comexPt from "./locales/pt/comex.json";
import comexEn from "./locales/en/comex.json";
import comexEs from "./locales/es/comex.json";
import managementPt from "./locales/pt/management.json";
import managementEn from "./locales/en/management.json";
import managementEs from "./locales/es/management.json";
import trackindDeliveryPt from "./locales/pt/tracking-delivery.json";
import trackindDeliveryEn from "./locales/en/tracking-delivery.json";
import trackindDeliveryEs from "./locales/es/tracking-delivery.json";

const resources = {
  "pt-BR": {
    translation: {
      ...generalPt,
      ...comexPt,
      ...managementPt,
      ...trackindDeliveryPt,
    },
  },
  en: {
    translation: {
      ...generalEn,
      ...comexEn,
      ...managementEn,
      ...trackindDeliveryEn,
    },
  },
  es: {
    translation: {
      ...generalEs,
      ...comexEs,
      ...managementEs,
      ...trackindDeliveryEs,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt-BR",
  interpolation: {
    escapeValue: false,
  },
  debug: true,
});

export default i18n;
