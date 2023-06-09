import Joi from "joi";
import { db } from "../database/connection.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";
import multer from "multer";
import { postStorage, fileFilter } from "../index.js";

export const getPosts = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You're not authorized.");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
      if (err) return res.status(403).json("You're not authorized.");

      const userId = req.query.userId;
      const q = userId
        ? `SELECT p.*,u.id As userId,name,profileImage FROM posts AS p JOIN users As u ON (u.id = p.userId)
      WHERE p.userId = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*,u.id As userId,name,profileImage FROM posts AS p JOIN users As u ON(u.id=p.userId)
      LEFT JOIN relationships As r ON(p.userId = r.followed_userId) WHERE r.follower_userId = ? OR p.userId ORDER BY p.createdAt DESC`;

      db.query(
        q,
        userId ? [userId] : [userInfo.id, userInfo.id],
        (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(data);
        }
      );
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const addPost = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You're not authorized.");

    jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
      if (err) return res.status(403).json("You're not authorized.");

      const q =
        "INSERT INTO posts(`details`, `image`, `createdAt`, `userId`) VALUES (?)";
      const values = [
        req.body.details,
        req.body.image,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been created.");
      });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const updatePost = async (req, res) => {
  try {
    const schema = Joi.object({
      details: Joi.string().min(4).required(),
      image: Joi.object({
        data: Joi.binary().encoding("base64").required(),
        contentType: Joi.string().required(),
        name: Joi.string().required(),
      }).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You're not authorized.");

    jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
      if (err) return res.status(403).json("You're not authorized.");

      const upload = multer({
        storage: postStorage,
        fileFilter: fileFilter,
      }).single("image");

      upload(req, res, async (err) => {
        if (err) return res.status(500).json(err);

        const q =
          "UPDATE posts SET `userId` = ?,`details` = ?,`image` = ? WHERE `id` = ?";

        const values = [
          userInfo.id,
          req.body.details,
          req.file.filename,
          req.params.id,
          // moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ];

        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          if (data.affectedRows > 0)
            return res.status(200).json("post has been updated.");

          return res.status(403).json("You can only update your posts.");
        });
      });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const deletePost = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You're not authorized.");

    jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
      if (err) return res.status(403).json("You're not authorized.");

      const q = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?";

      db.query(q, [req.params.id, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.affectedRows > 0)
          return res.status(200).json("Post has been deleted.");

        return res.status(403).json("You can only delete your posts.");
      });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
