import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    recipeId:{type:[mongoose.Schema.Types.ObjectId],ref:"recipe"}
});

const User = mongoose.model("user",userSchema);

export default User;