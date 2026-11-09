export const DEFAULT_LANGUAGE = "fr";
export const SUPPORTED_LANGUAGES = Object.freeze(["fr", "en"]);
export const LANGUAGE_STORAGE_KEY = "portfolio.language";

export function isSupportedLanguage(language) {
  return SUPPORTED_LANGUAGES.includes(language);
}

export function readStoredLanguage(getStorage = () => window.localStorage) {
  try {
    const storedLanguage = getStorage()?.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLanguage(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

export function writeStoredLanguage(
  language,
  getStorage = () => window.localStorage,
) {
  if (!isSupportedLanguage(language)) return;

  try {
    getStorage()?.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // React state keeps the language usable when browser storage is blocked.
  }
}

function findMessage(catalog, key) {
  return key.split(".").reduce((value, part) => {
    if (value && typeof value === "object" && Object.hasOwn(value, part)) {
      return value[part];
    }
    return undefined;
  }, catalog);
}

export function translate(language, key, values = {}, catalogs) {
  const message =
    findMessage(catalogs[language], key) ?? findMessage(catalogs.fr, key);

  if (typeof message !== "string") return key;

  return message.replace(/\{([\w.-]+)\}/g, (placeholder, name) => {
    if (!Object.hasOwn(values, name)) return placeholder;
    return String(values[name]);
  });
}
