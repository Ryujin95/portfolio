import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  readStoredLanguage,
  translate,
  writeStoredLanguage,
} from "./language.js";

const emptyCatalogs = { fr: {}, en: {} };

function createStorage(value) {
  return {
    getItem: (key) => (key === LANGUAGE_STORAGE_KEY ? value : null),
    setItem: (key, nextValue) => {
      if (key === LANGUAGE_STORAGE_KEY) value = nextValue;
    },
  };
}

test("uses French by default when storage has no language", () => {
  assert.equal(readStoredLanguage(() => createStorage(null)), DEFAULT_LANGUAGE);
});

test("restores stored French and English values", () => {
  assert.equal(readStoredLanguage(() => createStorage("fr")), "fr");
  assert.equal(readStoredLanguage(() => createStorage("en")), "en");
});

test("falls back to French for an unsupported stored value", () => {
  assert.equal(readStoredLanguage(() => createStorage("de")), DEFAULT_LANGUAGE);
});

test("falls back to French when reading storage throws", () => {
  assert.equal(
    readStoredLanguage(() => {
      throw new Error("Storage is unavailable");
    }),
    DEFAULT_LANGUAGE,
  );
});

test("writes a supported language and tolerates write failures", () => {
  let written;
  writeStoredLanguage("en", () => ({
    setItem: (_key, value) => {
      written = value;
    },
  }));
  assert.equal(written, "en");
  assert.doesNotThrow(() =>
    writeStoredLanguage("fr", () => {
      throw new Error("Storage is unavailable");
    }),
  );
});

test("interpolates complete messages and leaves unknown placeholders intact", () => {
  const catalogs = {
    fr: { game: { status: "Score : {score}, temps : {seconds}s" } },
    en: { game: { status: "Score: {score}, time: {seconds}s" } },
  };

  assert.equal(
    translate("en", "game.status", { score: 12, seconds: 8 }, catalogs),
    "Score: 12, time: 8s",
  );
  assert.equal(
    translate("fr", "game.status", { score: 12 }, catalogs),
    "Score : 12, temps : {seconds}s",
  );
  assert.equal(translate("en", "missing.key", {}, emptyCatalogs), "missing.key");
});
