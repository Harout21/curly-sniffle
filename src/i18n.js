import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./i18n/en.json";
import hy from "./i18n/hy.json";
import ru from "./i18n/ru.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hy: { translation: hy },
    ru: { translation: ru }
  },
  lng: "hy",
  fallbackLng: "hy",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;