import express from "express";
import { body } from "express-validator";

import validateRequest from "../middlewares/validateRequest.js";
import {
  createProjectController,
  deleteProjectController,
  getProjectController,
  getProjectsController,
  updateProjectController,
} from "../controllers/projectController.js";
import protect from "../middlewares/authMiddleware.js";

const projectRouter = express.Router();

projectRouter.use(protect);

projectRouter.post(
  "/",
  [body("name").trim().notEmpty().withMessage("Project name is required")],
  validateRequest,
  createProjectController
);

projectRouter.get("/", getProjectsController);

projectRouter.get("/:id", getProjectController);

projectRouter.put(
  "/:id",
  [body("name").trim().notEmpty().withMessage("Project name is required")],
  validateRequest,
  updateProjectController
);

projectRouter.delete("/:id", deleteProjectController);

export default projectRouter;
