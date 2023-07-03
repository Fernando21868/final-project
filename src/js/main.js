import {
  filterByAreaIngredientCategory,
  listAllCategories,
} from "./productData.mjs";
import { iconFavorites, loadHeaderFooter, renderListWithTemplate } from "./utils.mjs";

loadHeaderFooter()

setTimeout(() => {
  iconFavorites();
}, 200);

function returnRandomListItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

async function returnRandomCIA() {
  const categories = await listAllCategories("c");
  const areas = await listAllCategories("a");
  const ingredients = await listAllCategories("i");
  const randomCategory = returnRandomListItem(categories).strCategory;
  const randomArea = returnRandomListItem(areas).strArea;
  const randomIngredient = returnRandomListItem(ingredients).strIngredient;
  return [randomCategory, randomArea, randomIngredient];
}

async function getRandomItem(category, categoryOption) {
  let randomItem = await filterByAreaIngredientCategory(
    category,
    categoryOption
  );
  while (randomItem === null) {
    const [randomCategory] = await returnRandomCIA();
    randomItem = await filterByAreaIngredientCategory(category, randomCategory);
  }
  return returnRandomListItem(randomItem)
}

async function returnRandomItemsCIA() {
  const [randomCategory, randomArea, randomIngredient] =
    await returnRandomCIA();

  const randomCategoryItem = await getRandomItem("c", randomCategory);
  const randomAreaItem = await getRandomItem("a", randomArea);
  const randomIngredientItem = await getRandomItem("i", randomIngredient);

  const objectCIA = [
    {
      category: "Category",
      randomCategory,
      randomCategoryItem,
    },
    {
      category: "Area",
      randomCategory: randomArea,
      randomCategoryItem: randomAreaItem,
    },
    {
      category: "Ingredient",
      randomCategory: randomIngredient,
      randomCategoryItem: randomIngredientItem,
    },
  ];
  return objectCIA;
}

async function mealList() {
  let el = document.querySelector(".search-category__list");
  const products = await returnRandomItemsCIA();
  renderListWithTemplate(productCardTemplate, el, products);
}

export function productCardTemplate(meal) {
  return `
  <li class="search-category__item">
    <a href="meal-list/index.html?category=${meal.category}&list=${meal.randomCategory}">
    <img
      src="${meal.randomCategoryItem.strMealThumb}"
      alt="${meal.randomCategoryItem.strMeal}"
    />
    <h3 class="search-category__name">${meal.randomCategory}</h3>
    <h2 class="search-category__title">Search by ${meal.category}</h2>
    <div class="search-category__button">
      <button>Search</button>
    </div>
  </li>
  `;
}

mealList();
