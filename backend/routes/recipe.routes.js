import express from 'express';
import { searchRecipe } from '../controller/recipe.controller.js';
import { checkToken } from '../middlewear/auth.middlewear.js';

const recipeRouter = express.Router();

recipeRouter.post('/search',checkToken,searchRecipe);

export default recipeRouter;