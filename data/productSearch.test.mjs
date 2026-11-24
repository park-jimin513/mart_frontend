import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { matchesProductSearch } from "./productSearch.mjs";

describe("matchesProductSearch", () => {
  const eggProduct = {
    name: "Farm Fresh Country Eggs (Natu Gudlu)",
    description: "Nutritious brown desi eggs from local farmers.",
    subCategory: "Country Eggs"
  };
  const onionProduct = {
    name: "Fresh Red Onions (Desi Ullipaya)",
    description: "Crisp red onions harvested from local farms.",
    subCategory: "Daily Veggies"
  };

  it("matches singular and plural egg searches to eggs", () => {
    assert.equal(matchesProductSearch(eggProduct, "egg"), true);
    assert.equal(matchesProductSearch(eggProduct, "eggs"), true);
  });

  it("does not match egg as a substring inside unrelated category words", () => {
    assert.equal(matchesProductSearch(onionProduct, "egg"), false);
  });

  it("requires every search term to match the product", () => {
    assert.equal(matchesProductSearch(onionProduct, "red onion"), true);
    assert.equal(matchesProductSearch(onionProduct, "red egg"), false);
  });
});
