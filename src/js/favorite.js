import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

const favoritesMeals = getLocalStorage("favorites");

function renderFavoriteMeal(favorite) {
  return `<li class="favorites-meal__item">
    <h3 class="favorites-meal__subtitle">${favorite.strMeal}</h3>
    <div class="favorites-meal__info">
      <img class="favorites-meal__img" src="${favorite.strMealThumb}" alt="${favorite.strMeal}">
      <div class="favorites-meal__details">
        <p class="favorites-meal__area">Area of Meal: <span class="favorites-meal__span">${favorite.strArea}</span></p>
        <p class="favorites-meal__category">Category of Meal: <span class="favorites-meal__span">${favorite.strCategory}</span></p>
        <div class="favorites-meal__sources">
          <a target="_blank" class="favorites-meal__source" href="${favorite.strSource}">Source</a>
          <a target="_blank" class="favorites-meal__source" href="${favorite.strYoutube}">Video</a>
        </div>
        <div class="favorites-meal__button">
          <a class="search-category__detail favorite" data-id="${favorite.idMeal}" href="/meal-detail/index.html?id=${favorite.idMeal}">Detail</a>
        </div>
      </div>
    </div>
  </li>`;
}

const ulMeal = document.querySelector(".favorites-meal__list");

favoritesMeals.map((favorite) => {
  const li = renderFavoriteMeal(favorite);
  ulMeal.insertAdjacentHTML("afterbegin", li);
});

loadHeaderFooter();
