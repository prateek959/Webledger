import express from 'express';
import 'dotenv/config';
import db from './config/db.js';
import userRouter from './routes/user.routes.js';
import recipeRouter from './routes/recipe.routes.js';
import cors from 'cors';
const app = express();
app.use(express.json());
// const corsOptions = {
//     origin: ["http://127.0.0.1:5500"],
//     credentials: true
// };
app.use(cors({
    origin:["http://127.0.0.1:5500"],
    credentials: true
}));

app.use('/user',userRouter);
app.use('/recipe',recipeRouter);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
    await db();
    console.log(`Server is running on ${PORT}`)
})