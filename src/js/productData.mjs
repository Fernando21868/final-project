const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw new Error("Bad Response");
  }
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `lookup.php?i=${id}`);
  const product = await convertToJson(response);
  return product.meals;
}

export async function listAllCategories(param) {
  const response = await fetch(baseURL + `list.php?${param}=list`);
  const product = await convertToJson(response);
  return product.meals;
}

export async function filterByAreaIngredientCategory(param, area) {
  const response = await fetch(baseURL + `filter.php?${param}=${area}`);
  const product = await convertToJson(response);
  return product.meals;
}
