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

// Button For More Recommendation
$('.generate').click(() => {
    generateFeed();
    $('#search input').val('');
});

// Element Creation
function createElements(meal) {
    
    // Avoids repeating
    if ($(`#${meal.idMeal}`).length > 0) {
        return;
    }
    // Checks for Haram
    const isHaram = haramChecker(meal);
    if (isHaram) {
        return;
    }
    
    // Creates
    $('#browse').append(`
    <div class="recipe" id="${meal.idMeal}">
        <img src=${meal.strMealThumb}></img>
        <div class = "details">
            <p class="title">${meal.strMeal}</p>
            <p>${meal.strCategory}</p>
            <p>${meal.strArea}</p>
        </div>
    </div>
    `);
};


generateFeed();

// Display Recipe
$('#browse').on('click', '.recipe', function() {
    displayRecipe($(this).attr('id'));
});


// Displays the instructions and recipe
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


// Gets the ingredients
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

async function searchData(input) {
    
    try {
    // Getting The Type Of Input
    let response, data;
    
    if(!isNaN(input)){
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${input}`);
    } else if (input.length === 1) {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`);
    } else {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
    }
    
    data = await response.json();
        
    // Loader
    if (typeof input === 'string') {
        if (data.meals) {
            $('#browse').html('');
            data.meals.forEach(meal => {
            const isHaram = haramChecker(meal);
            if (isHaram) {
                return;
            }
            createElements(meal);
            });
        } else {
            throw new Error('This is not available');
        }
    } else if (input = "") {
        throw new Error('Please Enter something!');
    }
    }
    catch (error) {
        $('#err').css('display', 'block');
        $('#err').text(error);
    }
}
$(document).click(() => $('#err').css('display', 'none'));


// Haram checker
let haram = ['pork', 'ham', 'bacon', 'wine', 'vodka', 'gelatin', 'beer', 'whiskey', 'sausage'];
function haramChecker(meal) {
    // Deletes foods that are haram in islam.
    let ingredients = [];
    
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

// Filter
$('.drop button').click(function() {
    const isActive = $(this).hasClass('active');
    
    // First, remove all active classes
    $('.content, .drop button').removeClass('active');
    
    // If the button wasn't already active, activate it and its content
    if (!isActive) {
        $(this).siblings('.content').addClass('active');
        $(this).addClass('active');
    }
});

// Dropdown
async function drop(type) {
    // Gets response from server according to the type
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?${type.charAt(0)}=list`)
    const data = await response.json();
    
    let tyText = 'btn.str' + type.charAt(0).toUpperCase() + type.slice(1);
    
    data.meals.forEach(btn => {
        // Checks Haram
        if (haram.some(haram => eval(tyText).toLowerCase().includes(haram))) {
            return;
        }
        
        // Creates
        $(`#${type} .content`).append(
            `<button class='filter-btn'>${eval(tyText)}</button>`
        );
    });
    
    
}

// Run them
['category', 'area', 'ingredient'].forEach(drop);


// Clicking On Filter
$(document).on('click', '.filter-btn', function() {
    let value = $(this).text();
    let type = $(this).closest('.content').parent().attr('id').charAt(0);
    
    filter(value, type);
});


// Filter Function
async function filter(value, type){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${type}=${value}`);
    const data = await response.json();
    
    $('#browse').html('');
    for (const meal of data.meals) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
        const data = await response.json();
        const detailedMeal = data.meals[0];
    
        createElements(detailedMeal);
    }
    
}