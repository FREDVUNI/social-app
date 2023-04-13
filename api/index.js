import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
const app = express();

app.use(morgan("tiny"));
app.use(cors());
dotenv.config({ path: ".env" });



const PORT = process.env.PORT;

app.listen(() => {
  console.log(`server started on http://localhost:${PORT}`);
});
