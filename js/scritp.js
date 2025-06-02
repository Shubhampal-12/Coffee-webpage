function openSearchbar() {
  let navbar = document.querySelector(".navbar");
  let searchFrom = document.querySelector(".search-form");
  let cartItem = document.querySelector(".cart-item-cont");

  document.querySelector("#bars-btn").onclick = () => {
    navbar.classList.toggle("active");
    searchFrom.classList.remove("active");
    cartItem.classList.remove("active");
  };

  document.querySelector("#search-btn").onclick = () => {
    searchFrom.classList.toggle("active");
    navbar.classList.remove("active");
    cartItem.classList.remove("active");
  };

  document.querySelector("#cart-btn").onclick = () => {
    cartItem.classList.toggle("active");
    navbar.classList.remove("active");
    searchFrom.classList.remove("active");
  };
  Window.onscroll = () => {
    navbar.classlist.remove("active");
    cartItem.classList.remove("active");
    searchFrom.classList.remove("active");
  };
}
openSearchbar();

function searchAPI() {
  const searchBtn = document.getElementById("search");
  const searchbox = document.getElementById("search-box");
  const recipeContainer = document.getElementById("recipe-container");
  const recipeDetailsContent = document.getElementById(
    "recipe-details-content"
  );
  const recipeCloseBtn = document.getElementById("recipe-close-btn");

  const fetchRecipes = async (query) => {
    try {
      recipeContainer.innerHTML = "<h1>Fetching Recipes...</h1>";
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();

      recipeContainer.innerHTML = "";

      if (data.meals) {
        data.meals.forEach((meal) => {
          const recipeDiv = document.createElement("div");
          recipeDiv.classList.add("recipe");
          recipeDiv.innerHTML = `
             <img src="${meal.strMealThumb}" alt="Meal Image">
             <h3>${meal.strMeal}</h3>
             <p><span>${meal.strArea}</span></p>
             <p>Belongs to <span>${meal.strCategory}</span> Category</p>
           `;

          const button = document.createElement("button");
          button.textContent = "View Recipe";
          recipeDiv.appendChild(button);

          // Open recipe in a new page
          button.addEventListener("click", () => {
            const recipeURL = `html/recipe.html?mealId=${meal.idMeal}`;
            window.open(recipeURL, "_blank"); // Opens in a new tab
          });

          recipeContainer.appendChild(recipeDiv);
        });
      } else {
        recipeContainer.innerHTML = "<h2>No recipes found!</h2>";
      }
    } catch (error) {
      recipeContainer.innerHTML = "<h1>Error fetching recipes</h1>";
      console.error("Error fetching recipes:", error);
    }
  };

  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchbox.value.trim();
    if (searchInput) {
      fetchRecipes(searchInput);
    }
  });
}

// Call the function
searchAPI();
