// Home Page


// Generating Feed

async function generateFeed(){
    for (let i = 0; i < 5; i++) {
        let randomRecipe = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        let data = await randomRecipe.json();
        let meal = data.meals[0];
        
        const isHaram = haramChecker(meal);
        if (isHaram) {
            i--;
            continue;
        }
        createElements(meal);
    }
}
$('.generate').click(() => {
    generateFeed();
    $('#search input').val('');
});

// Element Creation
function createElements(meal) {
    
    // Avoids repeating
    if ($(`#${meal.idMeal}`).length > 0) {
        return
    }
    
    let recipe = $(`
    <div class="recipe" id="${meal.idMeal}">
        <img src=${meal.strMealThumb}></img>
        <div class = "details">
            <p class="title">${meal.strMeal}</p>
            <p>${meal.strCategory}</p>
            <p>${meal.strArea}</p>
        </div>
    </div>
    `);
    
    $('#browse').append(recipe);
};


generateFeed();

// Display Recipe
$('#browse').on('click', '.recipe', function() {
    displayRecipe($(this).attr('id'));
});

async function displayRecipe(mealId) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();
    const meal = data.meals[0];
    
    // Ingredients
    let ingredients = getIngredients(meal);
    
    $('#screen').css('display', 'flex');
    $('#screen').html(`
        <button id="back"><i class="fi fi-br-cross"></i></button>
        <img id = "displayImage" src="${meal.strMealThumb}">
        <div class="info">
            <h2 id="name">${meal.strMeal}</h2>
            <div class="details">
                <p id="category">${meal.strCategory}</p>
                <p id="place">${meal.strArea}</p>
            </div>
            <p id="instructions">
                <h3>Instructions</h3>
                ${meal.strInstructions}
            </p>
            <div id="ing-list">
                <h3>Ingredients</h3>
                ${ingredients.join('\n')}
            </div>
            
            <div class="src">
                <a href="${meal.strYoutube}">Tutorial</a>
                <a href="${meal.strSource}">Source</a>
            </div>
        </div>
    `);
    
    // Close Display
    $('#back').click(() => {
        $('#screen').css('display', 'none');
        $('#screen').html('')
    });
}


function getIngredients(meal) {
    const ingredients = [];
    
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        if (ingredient && ingredient !== "") {
            ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
        }
    }
    
    return ingredients;
}


// Search

$('#search').submit(e => {
    e.preventDefault();
    searchData($('input').val().trim());
})

async function searchData(name) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        const data = await response.json();
        
        // Error Handling
        if (name === "Pork") {
            throw new Error('Haram foods are not here!')
        }
        if (!data.meals) {
            throw new Error('This is not available');
        }
        
        // Loader
        $('#browse').html('');
        data.meals.forEach(meal => {
            const isHaram = haramChecker(meal);
            if (isHaram) {
                return;
            }
            createElements(meal);
        });
        
    }
    catch (error) {
        $('#err').css('display', 'block');
        $('#err').text(error);
    }
    
}
$(document).click(() => $('#err').css('display', 'none'));

// Haram checker
function haramChecker(meal) {
    // Deletes foods that are haram in islam.
    let ingredients = [];
    let haram = ['pork', 'ham', 'bacon', 'wine', 'vodka', 'gelatin', 'beer', 'whiskey', 'sausage'];
    
    for (let i = 0; i < 20; i++) {
        let ing = meal[`strIngredient${i}`];
        if (ing) {
            ingredients.push(ing.toLowerCase());
        }
    }
    
    const isHaram = ingredients.some(ing =>
        haram.some(haramItem => ing.includes(haramItem))
    );
    return isHaram;
}
