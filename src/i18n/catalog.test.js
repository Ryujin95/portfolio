import assert from "node:assert/strict";
import test from "node:test";
import en from "./locales/en.json" with { type: "json" };
import fr from "./locales/fr.json" with { type: "json" };

function leafPaths(value, prefix = "") {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return child && typeof child === "object" ? leafPaths(child, path) : [path];
  });
}

test("French and English catalogs contain the same translation keys", () => {
  assert.deepEqual(leafPaths(en).sort(), leafPaths(fr).sort());
});

test("both catalogs contain a non-empty string for every key", () => {
  for (const [language, catalog] of Object.entries({ fr, en })) {
    for (const path of leafPaths(catalog)) {
      const value = path.split(".").reduce((node, part) => node[part], catalog);
      assert.equal(typeof value, "string", `${language}:${path} must be a string`);
      assert.notEqual(value.trim(), "", `${language}:${path} must not be empty`);
    }
  }
});
