import { db } from "../database/connection.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const getPosts = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You're not authorized. - login");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
      if (err)
        return res.status(403).json("You're not authorized. - invalid cookie");

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
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You're not authorized. - login");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
      if (err) res.status(403).json("You're not authorized. - invalid cookie");

      const q =
        "INSERT INTO posts(`details`,`image`,`createdAt`,`userId`) VALUES(?)";
      const values = [
        req.body.details,
        req.body.image,
        moment(Date.now()).format("YYY-MM-DD HH:mm:ss"),
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
// export const logout = async () => {
//   try {
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };
