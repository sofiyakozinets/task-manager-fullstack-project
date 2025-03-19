/* eslint-disable no-console */
import * as process from "process";

import cors from "cors";
import express, { Request } from "express";

import { ID, TaskInterface, UpdateTaskData } from "lib/types";

import prisma from "./prisma";

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

// Fetch all tasks
router.get("/tasks", async (_, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Fetch a task by ID
router.get("/tasks/:id", async (req: Request<{ id: ID }>, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id: Number(id) }
    });
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.json(task);
  } catch (error) {
    console.error("Error fetching task: ", error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

// Create a task
router.post(
  "/tasks",
  async (req: Request<object, object, Omit<TaskInterface, "id">>, res) => {
    try {
      const { color, completed, description, title } = req.body;
      const task = await prisma.task.create({
        data: {
          color,
          completed,
          description,
          title
        }
      });
      res.status(201).json(task);
    } catch (error) {
      console.error("Error creating task: ", error);
      res.status(500).json({ error: "Failed to create task" });
    }
  }
);

// Update a task by ID
router.patch(
  "/tasks/:id",
  async (req: Request<{ id: ID }, object, UpdateTaskData>, res) => {
    try {
      const { id } = req.params;
      const updatedTask = req.body;
      const task = await prisma.task.update({
        data: {
          ...updatedTask
        },
        where: { id: Number(id) }
      });
      res.json(task);
    } catch (error) {
      console.error("Error updating task: ", error);
      res.status(500).json({ error: "Failed to update task" });
    }
  }
);

// Delete a task by ID
router.delete("/tasks/:id", async (req: Request<{ id: ID }>, res) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task: ", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Delete all tasks
router.post("/tasks/reset", async (_, res) => {
  try {
    await prisma.task.deleteMany();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting tasks: ", error);
    res.status(500).json({ error: "Failed to delete tasks" });
  }
});

app.use("/api", router);

const port = process.env.API_PORT || 5001;
app.listen(port, () => {
  console.log(`API Server is running on port ${port}`);
});
