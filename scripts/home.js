// Home Page


// Search

const search = $('#search');

search.submit(e=>{
    e.preventDefault();
    
})

// Getting Recipe Data

async function getData(name) {
    const rawData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await rawData.json();
    
    generateFeed();
}
getData('fried chicken');


// Generating Feed

async function generateFeed(){
    for (let i = 0; i < 5; i++) {
        
        // Meal Data
        let randomRecipe = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        let data = await randomRecipe.json();
        let meal = data.meals[0];
        
        let ingredients = [];
        
        // Deletes foods that are haram in islam.
        let haram = ['pork', 'ham', 'bacon', 'wine', 'vodka', 'gelatin', 'beer', 'whiskey'];
        
        for (let i = 0; i <= 20; i++) {
            let ing = meal[`strIngredient${i}`];
            if (ing) {
                ingredients.push(ing.toLowerCase());
            }
        }
            
            const isHaram = ingredients.some(ing =>
                haram.some(haramItem => ing.includes(haramItem))
            );
            if (isHaram) {
                i--;
                continue;
            }
            
        // Displays the food
        
        let title = meal.strMeal;
        let category = meal.strCategory;
        let area = meal.strArea;
        let thumbnail = meal.strMealThumb
        
        // Element Creation
        let recipe = $(`
        <div class="recipe">
            <img src=${thumbnail}></img>
            <div class = "details">
                <p>${title}</p>
                <p>${category}</p>
                <p>${area}</p>
            </div>
        </div>
        `);
        
        $('#browse').append(recipe);
            
    }
}