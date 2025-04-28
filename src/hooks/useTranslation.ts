import { useSelector, RootStateOrAny } from 'react-redux';
import { format, Locale } from 'date-fns';
import { ptBR, enUS, de, es } from 'date-fns/locale';
import { LanguageState } from 'store/ducks/language';

export const useTranslation = (translationObject: Record<string, any>) => {
  const { language } = useSelector<RootStateOrAny, LanguageState>(
    (state) => state.language
  );

  return {
    getTranslation(...path: string[]): string {
      const value =
        translationObject &&
        path.reduce(
          (prev, curr) => (prev == null ? undefined : prev[curr]),
          translationObject
        );

      return value ? (value[language] as string) : '';
    },
  };
};

export const useDateTranslation = () => {
  const { language } = useSelector<RootStateOrAny, LanguageState>(
    (state) => state.language
  );

  function getLocale(): Locale {
    switch (language) {
      case 'en':
        return enUS;
      case 'de':
        return de;
      case 'es':
        return es;
      default:
        return ptBR;
    }
  }

  return {
    formatDate(date: number | Date, formatString: string): string {
      return format(date, formatString, {
        locale: getLocale(),
      });
    },
  };
};
