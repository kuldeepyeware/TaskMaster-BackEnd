import { GraphQLError } from "graphql";
import { db } from "../../db.js";
import {
  createTask,
  createTaskSchema,
  deleteTaskSchema,
  updateTask,
  updateTaskSchema,
} from "./interfaces.js";

const queries = {
  getAllTasks: async () => {
    try {
      const tasks = await db.task.findMany({
        orderBy: {
          createdAt: "asc",
        },
      });
      return tasks;
    } catch (error) {
      if (error instanceof Error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "DATABASE_ERROR",
            isErrorHandled: false,
          },
        });
      } else {
        throw new GraphQLError("An unexpected error occurred", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            isErrorHandled: false,
          },
        });
      }
    }
  },
};

const mutations = {
  createTask: async (parent: any, { payload }: { payload: createTask }) => {
    const validatedData = createTaskSchema.safeParse(payload);

    if (!validatedData.success) {
      throw new GraphQLError("Wrong Payloads Provided", {
        extensions: {
          code: "DATABASE_ERROR",
          isErrorHandled: false,
        },
      });
    }

    const { title, description } = validatedData.data;

    try {
      const createdTask = await db.task.create({
        data: {
          title,
          description,
          status: "TODO",
        },
      });
      return createdTask;
    } catch (error) {
      if (error instanceof Error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "DATABASE_ERROR",
            isErrorHandled: false,
          },
        });
      } else {
        throw new GraphQLError("An unexpected error occurred", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            isErrorHandled: false,
          },
        });
      }
    }
  },
  updateTask: async (parent: any, { payload }: { payload: updateTask }) => {
    const validatedData = updateTaskSchema.safeParse(payload);

    if (!validatedData.success) {
      throw new GraphQLError("Wrong Payloads Provided", {
        extensions: {
          code: "DATABASE_ERROR",
          isErrorHandled: false,
        },
      });
    }

    const { id, title, description, status } = payload;

    try {
      const updatedTask = await db.task.update({
        where: { id },
        data: {
          title,
          description,
          status,
        },
      });
      return updatedTask;
    } catch (error) {
      if (error instanceof Error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "DATABASE_ERROR",
            isErrorHandled: false,
          },
        });
      } else {
        throw new GraphQLError("An unexpected error occurred", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            isErrorHandled: false,
          },
        });
      }
    }
  },
  deleteTask: async (parent: any, { id }: { id: string }) => {
    const validatedData = deleteTaskSchema.safeParse(id);

    if (!validatedData.success) {
      throw new GraphQLError("Wrong Payloads Provided", {
        extensions: {
          code: "DATABASE_ERROR",
          isErrorHandled: false,
        },
      });
    }

    try {
      await db.task.delete({
        where: { id: validatedData.data },
      });
      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "DATABASE_ERROR",
            isErrorHandled: false,
          },
        });
      } else {
        throw new GraphQLError("An unexpected error occurred", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            isErrorHandled: false,
          },
        });
      }
    }
  },
};

export const resolvers = { queries, mutations };
