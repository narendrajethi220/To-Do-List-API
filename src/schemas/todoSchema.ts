import z from "zod";

const todoSchema = z.object({
  id: z.number().int().positive(),
  title: z.string({ required_error: "Title is required" }).trim(),
  description: z.string().optional(),
  status: z.boolean().default(false),
  userId: z.number().positive(),
});

export type TodoSchema = z.infer<typeof todoSchema>;

export default todoSchema;
