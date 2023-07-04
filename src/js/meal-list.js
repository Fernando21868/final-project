import {
  filterByAreaIngredientCategory,
  filterMealByName,
  findProductById,
} from "./productData.mjs";
import {
  getParam,
  iconFavorites,
  loadHeaderFooter,
  renderListWithTemplate,
  setParam,
} from "./utils.mjs";

let categoryParam = getParam("category");
let listParam = getParam("list");

function mealListTemplate(meal) {
  return `
  <li class="search-category__item">
    <img
      src="${meal.strMealThumb}"
      alt="${meal.strMeal}"
    />
    <h2 class="search-category__title">${meal.strMeal}</h2>
    <div class="search-category__button">
      <button class="search-category__btn" data-id="${meal.idMeal}" >Quick view</button>
      <a class="search-category__detail" data-id="${meal.idMeal}" href="/meal-detail/index.html?id=${meal.idMeal}">Detail</a>
    </div>
  </li>
  `;
}

async function listOfMeals() {
  let mealListElement = document.querySelector(".search-category__list");
  const mealListInput = document.querySelector(".form-list__input");
  let listMeals;
  if (getParam("name")) {
    categoryParam = "Name";
    listParam = "Name";
    listMeals = await filterByAreaIngredientCategory("i", "Chicken");
  } else {
    let categoryParamLetter = categoryParam[0].toLocaleLowerCase();
    listMeals = await filterByAreaIngredientCategory(
      categoryParamLetter,
      listParam
    );
    if (!listMeals) {
      categoryParam = "Ingredient";
      listParam = "Chicken";
      categoryParamLetter = categoryParam[0].toLocaleLowerCase();
      listMeals = await filterByAreaIngredientCategory(
        categoryParamLetter,
        listParam
      );
      setParam("category", categoryParam);
      setParam("list", listParam);
    }
  }
  document.querySelector(
    ".form-list__title"
  ).textContent = `Search by ${categoryParam}`;
  mealListInput.setAttribute("placeHolder", listParam);
  renderListWithTemplate(mealListTemplate, mealListElement, listMeals);
  quickView();
}
// http://localhost:5173/meal-list/index.html?category=Ingredient&list=Vermicelli%20Pasta
async function searchMeal(e) {
  e.preventDefault();
  let listMeals;
  const categoryParamLetter = categoryParam[0].toLocaleLowerCase();
  const inputValue = document.querySelector(".form-list__input").value;
  let mealListElement = document.querySelector(".search-category__list");
  if (inputValue.trim()) {
    if (categoryParamLetter !== "n") {
      listMeals = await filterByAreaIngredientCategory(
        categoryParamLetter,
        inputValue
      );
    } else {
      listMeals = await filterMealByName(inputValue);
    }
    renderListWithTemplate(mealListTemplate, mealListElement, listMeals);
  }
}

document.forms["formSearchBy"].addEventListener("submit", searchMeal);

async function modalTemplate(meal) {
  const mealInfo = await meal;
  let modalInfo = document.querySelector(".modal__info");
  document.querySelector(".modal__title").textContent = mealInfo.strMeal;
  let modalInfoContent = `
    <img class="modal__img" src="${mealInfo.strMealThumb}" alt="${mealInfo.strMeal}">
    <div class="modal__categories">
      <span class="modal__category">Area: ${mealInfo.strArea}</span>
      <span class="modal__category">Category: ${mealInfo.strCategory}</span>
    </div>
    <p class="modal__instructions">${mealInfo.strInstructions}</p>
    <p>Source: <a target="_blank" href="${mealInfo.strSource}" class="modal__source">${mealInfo.strMeal}</a></p>
  `;
  modalInfo.innerHTML = modalInfoContent;
}

function quickView() {
  const buttonElements = document.getElementsByClassName(
    "search-category__btn"
  );
  for (let i = 0; i < buttonElements.length; i++) {
    buttonElements[i].addEventListener("click", async (e) => {
      const dataId = e.target.getAttribute("data-id");
      let modal = document.getElementById("myModal");
      modal.style.display = "block";
      const product = await findProductById(dataId);
      modalTemplate(product[0]);

      document.querySelector(".modal__close").addEventListener("click", () => {
        modal.style.display = "none";
      });
      window.addEventListener("click", (event) => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      });
    });
  }
}

listOfMeals();

loadHeaderFooter();

setTimeout(() => {
  iconFavorites();
}, 200);
