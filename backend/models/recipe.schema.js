import mongoose from "mongoose";

const recipeSchema =new mongoose.Schema({
    title:{type:String},
    image:{type:String}
});

const Recipe = mongoose.model("recipe",recipeSchema);

export default Recipe;