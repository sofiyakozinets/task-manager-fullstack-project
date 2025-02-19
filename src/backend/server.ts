import cors from "cors";
import express from "express";

import prisma from "./prisma";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/tasks", async (_, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id: Number(id) }
  });
  res.json(task);
});

app.post("/tasks", async (req, res) => {
  const { color, description, title } = req.body;
  const task = await prisma.task.create({
    data: { color, description, title }
  });
  res.json(task);
});

app.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;
  const task = await prisma.task.update({
    data: { ...updatedTask },
    where: { id: Number(id) }
  });
  res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({ where: { id: Number(id) } });
  res.json({ message: "Task deleted" });
});

app.post("/tasks/reset", async (_, res) => {
  await prisma.task.deleteMany();
  res.json({ message: "All tasks deleted" });
});

app.listen(5001, () => console.log("Server running on port 5001"));
