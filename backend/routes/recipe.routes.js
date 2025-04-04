import express from 'express';
import { addFavourite, getFavourite, removeFavourite, searchRecipe } from '../controller/recipe.controller.js';
import { checkToken } from '../middlewear/auth.middlewear.js';

const recipeRouter = express.Router();

recipeRouter.post('/search',checkToken,searchRecipe);
recipeRouter.post('/add',checkToken,addFavourite);
recipeRouter.get('/get',checkToken,getFavourite);
recipeRouter.post('/remove/:recipeId',checkToken,removeFavourite);

export default recipeRouter;