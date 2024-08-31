import { Status } from "@prisma/client";
import { z } from "zod";

export interface createTask {
  title: string;
  description?: string;
}

export interface updateTask {
  id: string;
  title: string;
  description?: string;
  status: Status;
}

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be 50 characters or less"),
  description: z.string().optional(),
});

export const updateTaskSchema = z.object({
  id: z.string().min(1, "Id is Required"),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
});

export const deleteTaskSchema = z.string().min(1, "Id is Required");
