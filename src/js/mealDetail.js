import { findProductById } from "./productData.mjs";
import {
  alertMessage,
  getLocalStorage,
  getParam,
  iconFavorites,
  loadHeaderFooter,
  setLocalStorage,
} from "./utils.mjs";

const mealId = getParam("id");
let meal;

async function renderMealDetail() {
  meal = await findProductById(mealId);
  document.querySelector(".meal-detail__title").textContent = meal[0].strMeal;
  document
    .querySelector(".meal-detail__img")
    .setAttribute("src", meal[0].strMealThumb);
  document
    .querySelector(".meal-detail__img")
    .setAttribute("alt", meal[0].strMeal);
  document.querySelector(
    ".meal-detail__category.area"
  ).textContent = `Area: ${meal[0].strArea}`;
  document.querySelector(
    ".meal-detail__category.category"
  ).textContent = `Category: ${meal[0].strCategory}`;
  document.querySelector(".meal-detail__instructions").textContent =
    meal[0].strInstructions;
  let ingredients = document.querySelector(".meal-detail__ingredients");
  let counter = 0;
  Object.keys(meal[0]).map((key) => {
    if (
      key.includes("strIngredient") &&
      meal[0][key] !== "" &&
      meal[0][key] !== null
    ) {
      counter++;
      let ingredient = document.createElement("div");
      ingredient.classList.add(".meal-detail__ingredient");
      ingredient.innerHTML = `<span class="meal-detail__measure"> ${
        meal[0][`strIngredient${counter}`]
      }: ${meal[0][`strMeasure${counter}`]}</span>`;
      ingredients.insertAdjacentElement("afterbegin", ingredient);
    }
  });
  document
    .querySelector(".meal-detail__source")
    .setAttribute("href", meal[0].strSource);
  document.querySelector(".meal-detail__source").textContent = meal[0].strMeal;
  document
    .querySelector(".meal-detail__source.youtube")
    .setAttribute("href", meal[0].strYoutube);
  document.querySelector(".meal-detail__source.youtube").textContent =
    meal[0].strMeal;
  document
    .querySelector(".meal-detail__button")
    .setAttribute("data-id", meal[0].idMeal);
}

function addToFavorite() {
  let favorites = getLocalStorage("favorites");
  // Check to see if there was anything in the cart
  if (!favorites) {
    favorites = [];
  }

  const existingMealIndex = favorites.findIndex(
    (favorite) => favorite.idMeal === meal[0].idMeal
  );

  if (existingMealIndex !== -1) {
    return;
  } else {
    favorites.push(meal[0]);
  }

  setLocalStorage("favorites", favorites);
  alertMessage("Meal added successfully to favorites!");
  iconFavorites();
}

renderMealDetail();

document
  .getElementById("addToFavorite")
  .addEventListener("click", addToFavorite);

loadHeaderFooter();

setTimeout(() => {
  iconFavorites();
}, 200);
