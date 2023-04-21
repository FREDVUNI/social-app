import { db } from "../database/connection.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getRelationships = async (req, res) => {
  try {
    const q = `SELECT follower_userId FROM relationships WHERE follower_userId = ?`;

    db.query(q, [req.query.follower_userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json(data.map(relationship => relationship.follower_userId));
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const addRelationship = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You're not authorized.");

    const q = "SELECT * FROM relationships WHERE followed_userId = ? ";

    db.query(q, [req.body.userId], (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.length)
        return res
          .status(409)
          .json("You're already following user " + req.body.userId);

      jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
        if (err) return res.status(403).json("You're not authorized.");

        const values = [
          userInfo.id,
          req.body.userId,
          moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ];

        if (userInfo.id === req.body.userId)
          return res.status(400).json("You can't follow yourself");

        const q =
          "INSERT INTO relationships(`follower_userId`,`followed_userId`,`createdAt`) VALUES (?)";

        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res
            .status(200)
            .json("You're now Following user " + req.body.userId);
        });
      });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const deleteRelationship = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You're not authorized.");

    jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
      if (err) return res.status(403).json("You're not authorized.");

      const q =
        "DELETE FROM relationships WHERE `follower_userId`= ? AND `followed_userId` = ?  ";

      db.query(q, [userInfo.id, req.query.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res
          .status(200)
          .json("You've unfollowed user " + req.query.userId);
      });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
