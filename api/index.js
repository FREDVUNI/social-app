import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./database/db.js";
import AuthRoutes from "./routes/auth.js";
// import CommentsRoutes from "./routes/comments.js";
// import LikesRoutes from "./routes/likes.js";
// import PostsRoutes from "./routes/posts.js";
// import UsersRoutes from "./routes/users.js";
const app = express();

app.use(morgan("tiny"));
dotenv.config({ path: ".env" });
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", AuthRoutes);
// app.use("api/users", UsersRoutes);
// app.use("api/posts", PostsRoutes);
// app.use("api/comments", CommentsRoutes);
// app.use("api/likes", LikesRoutes);

const PORT = process.env.PORT || 9000;

connectDB();
app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
