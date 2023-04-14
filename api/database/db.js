import { db } from "./connection.js";

export const connectDB = () => {
  try {
    db.connect((error) => {
      if (error) {
        throw error;
      }
      console.log("connected to db");
    });
  } catch (error) {
    console.log(error);
  }
};
