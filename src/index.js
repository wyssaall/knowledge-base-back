import express from "express";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import articlesRouter from './routes/article.routes.js'
import authRouter from "./routes/auth.routes.js";
import commentRouter from "./routes/comment.routes.js";
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import savedRouter from "./routes/saved.routes.js";
import adminRouter from "./routes/admin.routes.js";
import publicRouter from "./routes/public.routes.js";
import cors from "cors";
import path from "path";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";

dotenv.config()
const app = express();

const port = process.env.PORT || 5000;
connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));

app.use('/api/auth', authRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/comments', commentRouter);
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/saved', savedRouter);
app.use('/api/admin', adminRouter);
app.use('/api/public', publicRouter);

app.get('/api/health', (req, res) => {
    res.status(200).json({ message: "API is running" });
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`the server is running at port ${port}`);

})