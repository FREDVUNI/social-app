import { db } from "../database/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";

export const register = async (req, res) => {
  try {
    const schema = Joi.object({
        username:Joi.string().required().min(4),
        password:Joi.string().required().min(6),
        email:Joi.string().required().email(),
        name:Joi.string().alphanum().required().min(4)
    })

    const { error } = schema.validate(req.body)
    if(error) return res.status(400).json(error.details[0].message)

    const q = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(q, [req.body.username, req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length)
        return res
          .status(409)
          .json("user with this username or email already exists.");

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const values = [req.body.username, req.body.email, hash, req.body.name];

      const q =
        "INSERT INTO users(`username`,`email`,`password`,`name`) VALUES(?)";
      db.query(q, [values], (err, data) => {
        if (err) return res.status.json(err);
        return res.status(200).json("user has been created.");
      });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const login = async (req, res) => {
  try {
    const schema = Joi.object({
      username:Joi.string().required().min(4),
      password:Joi.string().required().min(6),
  })

  const { error } = schema.validate(req.body)
  if(error) return res.status(400).json(error.details[0].message)

    const q = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(q, [req.body.username, req.body.email], async (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.length === 0)
        return res.status(404).json("wrong username password combination.");

      const verify_password = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );

      if (!verify_password)
        return res.status(409).json("wrong username password combination.");

      const { password, ...others } = data[0];
      const token = jwt.sign(
        {
          id: data[0].id,
        },
        process.env.JWT_SECRET
      );

      await res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const logout = async (req, res) => {
  try {
    res
      .clearCookie("accessToken", {
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json("user has been logged out.");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
