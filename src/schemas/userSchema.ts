import z from "zod";

const userSchema = z.object({
  id: z.number().int().positive(),
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be of atleast 3 characters" })
    .max(255, { message: "Name must not exceed 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not exceed 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "password must be at least of 6 characters" })
    .max(1024, { message: "Password must not exceed 1024 characters " }),
  todos: z
    .array(
      z.object({
        id: z.number().int().positive(),
        title: z.string().min(1, { message: "Title cannot be empty" }),
        description: z.string().optional(),
        status: z.boolean().default(false),
        userId: z.number().int().positive(),
      })
    )
    .optional(),
});

export type UserSchema = z.infer<typeof userSchema>;

export default userSchema;
