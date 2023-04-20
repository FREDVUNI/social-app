import Joi from "joi";
import { db } from "../database/connection.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const getUser = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You're not authorized.");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
      if (err) return res.status(403).json("You're not authorized.");

      const q = "SELECT * FROM users WHERE `id` = ?";
      db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        const { password, ...user_info } = data[0];
        return res.status(200).json(user_info);
      });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
