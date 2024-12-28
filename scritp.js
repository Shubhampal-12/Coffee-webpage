function openSearchbar() {

    let navbar=document.querySelector('.navbar');
    let searchFrom=document.querySelector('.search-form');
    let cartItem = document.querySelector('.cart-item-cont');
 
  document.querySelector('#bars-btn').onclick = () => {
     navbar.classList.toggle('active');
     searchFrom.classList.remove('active');
     cartItem.classList.remove('active');
  }
 
  document.querySelector('#search-btn').onclick = () => {
     searchFrom.classList.toggle('active');
     navbar.classList.remove('active');
     cartItem.classList.remove('active');
  }
 
  document.querySelector('#cart-btn').onclick = () => {
     cartItem.classList.toggle('active');
     navbar.classList.remove('active');
     searchFrom.classList.remove('active');
 
  }
  Window.onscroll = () => {
     navbar.classlist.remove('active');
     cartItem.classList.remove('active');
     searchFrom.classList.remove('active');
  }
  };
  openSearchbar();
 
// fetch API
// function searchAPI (){

// var searchBtn = document.getElementById("search");
// var searchbox = document.getElementById("search-box");
// var  recipeContainer = document.getElementById("recipe-container")
// var  recipeDetailsContent = document.getElementById("recipe-details-content")
// var  recipeCloseBtn = document.getElementById("recipe-close-btn")

//  const fetchRecipes = async (query)=>{
//   try{

//   recipeContainer.innerHTML = "<h1>fetching Recipes .........</h1>";
//   const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`) ;
//   const response = await data.json();
//    console.log(response)

//    recipeContainer.innerHTML= " ";

//   response.meals.forEach(meal => {
//      const recipeDiv = document.createElement('div')
//      recipeDiv.classList.add('recipe');
//      recipeDiv.innerHTML=`
//             <img src="${meal.strMealThumb}">
//             <h3>${meal.strMeal}</h3>
//             <p><span>${meal.strArea}</span></p>
//             <p>Belongs to <span>${meal.strCategory} </span> Category</p>                                                    
       
//     `;
   
  
//     const button = document.createElement('button');
//     button.textContent = "View Recipe";
//     recipeDiv.appendChild(button);

    
//     // Adding eventlistener to recipe button popup         this is impoartant 

//     button.addEventListener('click',() =>{
//        openRecipePopup(meal);
//     });

//     recipeContainer . appendChild(recipeDiv);
//   });
    
//  }
 
//  catch(error)
//    { 
//     recipeContainer.innerHTML =  "<h1> Error Recipes .........</h1>"
//     console.error('Error fetching recipes:', error);
//     }
//  };

// // function to fetch ingredients and measurements

//   const fetchIngredients = (meal) =>{
    
//      let ingredientsList="";
//      for( let i = 1; i<=20; i++){
//       const ingredient = meal[`strIngredient${i}`];
//       if(ingredient) {
//         const measure = meal[`strMeasure${i}`];
//         ingredientsList += `<li>${measure} ${ingredient}</li>`
//       }
//       else{
//         break;
//       }
//      }
//      return ingredientsList;
     
//   }

//   //                 popup ka  result box  hai

//   const openRecipePopup = (meal) => {
//     recipeDetailsContent.innerHTML = `
//       <h2 class="recipename">${meal.strMeal}</h2>
//       <h3>Ingredients:</h3>
//       <ul class="ingredientList">Ingredients:${fetchIngredients(meal)}</ul>
//       <div class="recipeInstructions">
//         <h3>Instructions:</h3>
//         <p>${meal.strInstructions}</p>
      
//       </div>
//     `
    
//     recipeDetailsContent.parentElement.style.display="block";
//   }


//    recipeCloseBtn.addEventListener("click", ()=>{

//       recipeDetailsContent.parentElement.style.display="none"

//   });


//  searchBtn.addEventListener('click',(e)=>{
//     e.preventDefault();
//     // console.log("button on click")                         this is important
  
//     const searchInput = searchbox.value.trim();
//     fetchRecipes(searchInput);
    
//  })

// }
// searchAPI();
 
function searchAPI() {
   const searchBtn = document.getElementById("search");
   const searchbox = document.getElementById("search-box");
   const recipeContainer = document.getElementById("recipe-container");
   const recipeDetailsContent = document.getElementById("recipe-details-content");
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
             const recipeURL = `recipe.html?mealId=${meal.idMeal}`;
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
 
 
 
 
 