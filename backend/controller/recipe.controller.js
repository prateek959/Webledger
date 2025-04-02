const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

const searchRecipe = async(req, res)=>{
    try {
        const {recipe} = req.body;
        const url = `${BASE_URL}?query=${recipe}&apiKey=${process.env.FOOD_KEY}`; 
        const response = await fetch(url);
        if(!response.ok){
            console.error('Error fetching data:', response.status);
            return res.status(400).json({msg:"Recipe not found"});
        }
        const data = await response.json();
        const recipes = data.results;
        res.status(200).json(recipes);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const addFavourite = async(req, res)=>{
    try {
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" }); 
    }
}

export {searchRecipe};