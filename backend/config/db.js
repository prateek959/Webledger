import mongoose from "mongoose";

const db = async(req, res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB connected successfully');
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg:"Internal server error"});
    }
};

export default db;