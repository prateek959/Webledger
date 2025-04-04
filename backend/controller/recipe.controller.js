import Recipe from "../models/recipe.schema.js";
import User from "../models/user.model.js";

const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

const searchRecipe = async (req, res) => {
    try {
        const { recipe } = req.body;
        const url = `${BASE_URL}?query=${recipe}&apiKey=${process.env.FOOD_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Error fetching data:', response.status);
            return res.status(400).json({ msg: "Recipe not found" });
        }
        const data = await response.json();
        const recipes = data.results;
        res.status(200).json(recipes);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const addFavourite = async (req, res) => {
    try {
        const { title, image } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ smg: "Unauthorized" });
        }
        const data = await Recipe.findOne({ title });
        if (data) {
            user.recipeId.push(data._id);
            await user.save();
            return res.status(200).json({ msg: "Add favourite successfully" });
        }
        const recipe = await Recipe.create({
            title,
            image
        });
        user.recipeId.push(recipe._id);
        await user.save();
        res.status(201).json({ msg: "Add favourite successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    };
};

const getFavourite = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('recipeId');
        if (!user) {
            return res.status(401).json({ msg: "User not authorized" });
        }
        res.status(200).json(user.recipeId);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const removeFavourite = async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        const data = await Recipe.findById(recipeId);
        if (!data) {
            return res.status(400).json({ msg: "Recipe is Invalid" });
        }
        user.recipeId = user.recipeId.filter((elem) => elem._id.toString() !== data._id.toString());
        await user.save();
        res.status(200).json({ msg: "Remove data successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export { searchRecipe, addFavourite, getFavourite, removeFavourite };