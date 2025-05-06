import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

enum Langs {
  pt = "pt-BR",
  en = "en",
  es = "es",
}

const persistedLang = "i18nextLng";

const Language: React.FC = () => {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    handleChangeLanguage(
      (localStorage.getItem(persistedLang) as Langs) || Langs.pt
    );
  }, []);

  const handleChangeLanguage = (lang: Langs) => {
    localStorage.setItem(persistedLang, lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        className={`${
          i18n.language === Langs.pt
            ? "text-primary-500"
            : "text-gray-400 duration-300 hover:text-primary-500"
        } text-sm font-medium`}
        onClick={() => handleChangeLanguage(Langs.pt)}
      >
        PT
      </button>
      <button
        className={`${
          i18n.language === Langs.en
            ? "text-primary-500"
            : "text-gray-400 duration-300 hover:text-primary-500"
        } text-sm font-medium`}
        onClick={() => handleChangeLanguage(Langs.en)}
      >
        EN
      </button>
      <button
        className={`${
          i18n.language === Langs.es
            ? "text-primary-500"
            : "text-gray-400 duration-300 hover:text-primary-500"
        } text-sm font-medium`}
        onClick={() => handleChangeLanguage(Langs.es)}
      >
        ES
      </button>
    </div>
  );
};

export { Language };
