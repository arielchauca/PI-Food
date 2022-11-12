const axios = require('axios');
//const API_KEY= "424fa5a729c4440cb75fcdf12c2502f2"; // API_KEY de la cuenta de prueba de Spoonacular
const API_KEY= "e99fc5f58afc4d9f81bdde120fa2c955"; // API_KEY de la cuenta de prueba de Spoonacular 2
//const API_KEY= "6511824fe6514291818546d9e07d1d0a"; // API_KEY de la cuenta de prueba de Spoonacular 3
// API_KEY= "c59fc6de27b34962a39bd4aa9ace6848"; // API_KEY de la cuenta de prueba de Spoonacular 4
//const API_KEY= "2d5bf1be14ba4caa8d813d8bfb30a086"; // API_KEY de la cuenta de prueba de Spoonacular 5
//const API_KEY = "82eb86efe426434a8b802895d0861ab5";  // API_KEY de la cuenta de prueba de Spoonacular 6
const AllRecipes = async () => {
    const recipes = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data.results;
    const all = recipes.map(recipe => ({
        id: recipe.id,
        name: recipe.title,
        description: recipe.summary,
        puntuation: recipe.spoonacularScore,
        level: recipe.healthScore,
        steps: recipe.analyzedInstructions[0] && recipe.analyzedInstructions[0].steps? recipe.analyzedInstructions[0].steps.map(step => (
           step.step)): "",
        image: recipe.image,
        diets: recipe.diets.map(diet => ({name: diet}))
    }))
    return all;
}

const getRecipe = async (id) => {
    const recipe = (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)).data;
    const one = {
        id: recipe.id,
        name: recipe.title,
        description: recipe.summary,
        puntuation: recipe.spoonacularScore,
        level: recipe.healthScore,
        steps: recipe.analyzedInstructions[0] && recipe.analyzedInstructions[0].steps? recipe.analyzedInstructions[0].steps.map(step => (
            step.step)): "",
        image: recipe.image,
        diets: recipe.diets.map(diet => ({name: diet}))
    };
    return one;
}


module.exports = { AllRecipes, getRecipe };