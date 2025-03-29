import { Router } from "express";
import { signUp } from "../controllers/authControllers";

const userRouter = Router();

userRouter.post("/signup", signUp);

export default userRouter;
