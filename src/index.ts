import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/authRoutes";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hi, I am Backend of To-Do API");
});

app.use("/api/auth", userRouter);

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
