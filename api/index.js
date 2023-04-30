import express from "express";
const app = express();
import multer from "multer";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./database/db.js";
import AuthRoutes from "./routes/auth.js";
import CommentsRoutes from "./routes/comments.js";
import LikesRoutes from "./routes/likes.js";
import PostsRoutes from "./routes/posts.js";
import UsersRoutes from "./routes/users.js";
import RelationshipsRoutes from "./routes/relationships.js";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
});

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/uploads/posts");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

app.use("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

export const uploadSingleFile = () => {
  upload.single("image"),
    (req, res) => {
      const file = req.file;
      res.status(200).json(file.filename);
    };
};

app.use(morgan("tiny"));
dotenv.config({ path: ".env" });
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

app.use("/api/auth", AuthRoutes);
app.use("/api/users", UsersRoutes);
app.use("/api/posts", PostsRoutes);
app.use("/api/comments", CommentsRoutes);
app.use("/api/likes", LikesRoutes);
app.use("/api/relationships", RelationshipsRoutes);

const PORT = process.env.PORT || 9000;

connectDB();
app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
