import Joi from "joi";
import { db } from "../database/connection.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const getComments = async (req, res) => {
  try {
    const q = `SELECT c.*,u.id As userId,name,profileImage FROM comments AS c JOIN users As u ON(u.id=c.userId) 
      WHERE c.postId = ? ORDER BY c.createdAt DESC`;

    db.query(q, [req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const addComment = async (req, res) => {
  try {
    const schema = Joi.object({
      postId: Joi.number(),
      details: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You're not authorized.");

    jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
      if (err) return res.status(403).json("You're not authorized.");

      const values = [
        userInfo.id,
        req.body.postId,
        req.body.details,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ];

      const q =
        "INSERT INTO comments(`userId`,`postId`,`details`,`createdAt`) VALUES(?)";
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Comment has been created.");
      });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const updateComment = async (req, res) => {
  try {
    const schema = Joi.object({
      postId: Joi.number(),
      details: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You're not authorized.");

    jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
      if (err) return res.status(403).json("You're not authorized.");
      const q =
        "UPDATE comments SET `userId` = ?,`postId` = ?,`details` = ? WHERE `id` = ?";

      values = [userInfo.id, req.body.postId, req.body.details, req.query.id];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0)
          return res.status(200).json("profile has been updated.");

        return res.status(403).json("You can only update your comments.");
      });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const deleteComment = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You're not authorized.");

    jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
      if (err) return res.status(403).json("You're not authorized.");

      const q = "DELETE FROM comments WHERE `id` = ? AND `userId` = ?";

      db.query(q, [req.params.id, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.affectedRows > 0)
          return res.status(200).json("Comment has been deleted.");

        return res.status(403).json("You can only delete your comments.");
      });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
