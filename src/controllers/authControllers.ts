import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import Jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "my_secret_key";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "15d";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
      res.status(409).json({
        msg: "User already exists, Kindly Login",
      });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = Jwt.sign(
      { userId: newUser.id, name: newUser.name },
      JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (err: any) {
    res.status(500).json({
      msg: "Internal Server Error",
      data: err.message,
    });
  }
};
