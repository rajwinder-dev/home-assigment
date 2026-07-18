import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { LookupController } from "./lookup.controller.js";

const lookupRouter: Router = Router();

lookupRouter.use(authMiddleware.protectedRoute, authMiddleware.tenant);
lookupRouter.get("/roles", LookupController.getRoles);
lookupRouter.get("/mangers", LookupController.getMangers);
lookupRouter.get("/departments", LookupController.getDepartments);

export default lookupRouter;
