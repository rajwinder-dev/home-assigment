import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { MemberController } from "./member.controller.js";

const memberRouter: Router = Router();
memberRouter.use(authMiddleware.protectedRoute);
memberRouter.use(authMiddleware.tenant);

memberRouter.get(
  "/",
  authMiddleware.verifyPermission("employee", "view"),
  MemberController.getMembers,
);

export default memberRouter;
