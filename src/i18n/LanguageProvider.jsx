import { useCallback, useEffect, useMemo, useState } from "react";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import LanguageContext from "./LanguageContext.js";
import {
  isSupportedLanguage,
  readStoredLanguage,
  translate,
  writeStoredLanguage,
} from "./language.js";

const catalogs = { fr, en };

export default function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(readStoredLanguage);

  const setLanguage = useCallback((nextLanguage) => {
    if (!isSupportedLanguage(nextLanguage)) return;

    setLanguageState(nextLanguage);
    writeStoredLanguage(nextLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback(
    (key, values) => translate(language, key, values, catalogs),
    [language],
  );

  const contextValue = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
