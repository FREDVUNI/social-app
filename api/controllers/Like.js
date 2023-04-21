import { db } from "../database/connection.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getLikes = async (req, res) => {
  try {
    const q = `SELECT * FROM likes WHERE postId = ?`;

    db.query(q, [req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map((like) => like.userId));
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const addLike = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You're not authorized.");

    jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
      if (err) return res.status(403).json("You're not authorized.");

      const values = [
        userInfo.id,
        req.body.postId,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ];

      const q = "INSERT INTO likes(`userId`,`postId`,`createdAt`) VALUES (?)";

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been liked.");
      });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const deleteLike = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You're not authorized.");

    jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
      if (err) return res.status(403).json("You're not authorized.");

      const q = "DELETE FROM likes WHERE `userId`= ? AND `postId` = ?  ";

      db.query(q, [userInfo.id, req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been unliked.");
      });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
