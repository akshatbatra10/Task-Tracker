import express from "express";
import { body } from "express-validator";

import validateRequest from "../middlewares/validateRequest.js";
import {
  createTaskController,
  deleteTaskController,
  getTasksController,
  updateTaskController,
} from "../controllers/taskController.js";
import protect from "../middlewares/authMiddleware.js";

const taskRouter = express.Router({ mergeParams: true });

taskRouter.use(protect);

taskRouter.post(
  "/",
  [
    body("title").trim().notEmpty().withMessage("Task title is required"),
    body("status")
      .optional()
      .isIn(["pending", "in-progress", "completed"])
      .withMessage("Invalid status value"),
  ],
  validateRequest,
  createTaskController
);

taskRouter.get("/", getTasksController);

taskRouter.put(
  "/:taskId",
  [
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Title cannot be empty"),
    body("status")
      .optional()
      .isIn(["pending", "in-progress", "completed"])
      .withMessage("Invalid status value"),
  ],
  validateRequest,
  updateTaskController
);

taskRouter.delete("/:taskId", deleteTaskController);

export default taskRouter;
