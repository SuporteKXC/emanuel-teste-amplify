import { ptBR, enUS, de, es } from 'date-fns/locale';

type localeProps = {
  [label: string]: {
    label: string;
    language: Locale;
  };
};

export const locale: localeProps = {
  pt: { label: 'pt-BR', language: ptBR },
  en: { label: 'en-US', language: enUS },
  de: { label: 'de', language: de },
  es: { label: 'es', language: es },
};
