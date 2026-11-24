function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeToken(token) {
  if (token.length > 4 && token.endsWith("ies")) {
    return `${token.slice(0, -3)}y`;
  }

  if (token.length > 3 && token.endsWith("s") && !token.endsWith("ss")) {
    return token.slice(0, -1);
  }

  return token;
}

function tokenize(value) {
  return normalizeText(value)
    .split(/\s+/)
    .filter(Boolean)
    .map(normalizeToken);
}

export function matchesProductSearch(product, query, categoryName = "") {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return true;

  const productTokens = [
    product.name,
    product.description,
    product.brand,
    product.shopName,
    product.subCategory,
    product.weight,
    product.imageAlt,
    categoryName
  ].flatMap(tokenize);

  return queryTokens.every((queryToken) =>
    productTokens.some(
      (productToken) =>
        productToken === queryToken ||
        (queryToken.length < 3 && productToken.startsWith(queryToken))
    )
  );
}
