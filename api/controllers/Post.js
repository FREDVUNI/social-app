import Joi from "joi";
import { db } from "../database/connection.js";
import uploadSingleFile from "./upload.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const getPosts = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You're not authorized.");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
      if (err) return res.status(403).json("You're not authorized.");

      const q = `SELECT p.*,u.id As userId,name,profileImage FROM posts AS p JOIN users As u ON(u.id=p.userId)
      LEFT JOIN relationships As r ON(p.userId = r.followed_userId) WHERE r.follower_userId = ? OR p.userId 
      ORDER BY p.createdAt DESC`;

      db.query(q, [userInfo.id, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const addPost = async (req, res) => {
  try {
    const schema = Joi.object({
      details: Joi.string().required().min(4),
      image: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You're not authorized.");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
      if (err) return res.status(403).json("You're not authorized.");

      uploadSingleFile(req, res);

      const values = [
        userInfo.id,
        req.body.details,
        req.file,
        moment(Date.now()).format("YYY-MM-DD HH:mm:ss"),
      ];

      const q =
        "INSERT INTO posts(`userId`,`details`,`image`,`createdAt`) VALUES(?)";

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been created.");
      });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// export const logout = async () => {
//   try {
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };
