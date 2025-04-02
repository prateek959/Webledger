const API_KEY = "3071ae66a5aa45edbe584cbf8d20e557";

const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

console.log(API_KEY)
async function searchRecipes(query) {
  
  const url = `${BASE_URL}?query=${query}&apiKey=${API_KEY}`; 

  try {
 
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const recipes = data.results;
      console.log(data)
      console.log(recipes)
    } else {
      console.error('Error fetching data:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// const query = prompt('Enter a recipe or ingredient to search:');
searchRecipes('paneer butter masala');
