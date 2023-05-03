import Joi from "joi";
import { db } from "../database/connection.js";
import jwt from "jsonwebtoken";

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

export const updateProfile = async (req, res) => {
  try {
    // const schema = Joi.object({
    //   name: Joi.string().min(4).required(),
    //   username: Joi.string().min(4).required(),
    //   city: Joi.string().required(),
    //   website: Joi.string().required(),
    //   coverImage: Joi.object({
    //     data: Joi.binary().encoding("base64"),
    //     contentType: Joi.string(),
    //     name: Joi.string(),
    //   }),
    //   profileImage: Joi.object({
    //     data: Joi.binary().encoding("base64"),
    //     contentType: Joi.string(),
    //     name: Joi.string(),
    //   }),
    // });

    // const { error } = schema.validate(req.body);
    // if (error) return res.status(400).json(error.details[0].message);

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You're not authorized.");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
      if (err) return res.status(403).json("You're not authorized.");

      const q =
        "UPDATE users SET `name` = ?,`city` = ?,`website` = ?,`coverImage` = ?,`profileImage` = ? WHERE `id` = ?";

      db.query(
        q,
        [
          req.body.name,
          req.body.city,
          req.body.website,
          req.body.coverImage,
          req.body.profileImage,
          userInfo.id,
        ],
        (err, data) => {
          if (err) return res.status(500).json(err);
          if (data.affectedRows > 0)
            return res.status(200).json("profile has been updated.");
        }
      );
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
