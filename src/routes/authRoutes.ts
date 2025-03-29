import Router, { Request, Response } from "express";
const userRouter = Router();

userRouter.post("/signup", (req: Request, res: Response) => {
  res.send("Welcom to signup page");
});

export default userRouter;
