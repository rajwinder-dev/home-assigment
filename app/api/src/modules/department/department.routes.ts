import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware.js';
import { DepartrmentController } from './department.controller.js';
import { validationMiddleware } from '../../core/middleware/validationMiddleware.js';
import { createDepartmentInput } from '@org/zod';

const departmentRouter: Router = Router();
departmentRouter.use(authMiddleware.protectedRoute, authMiddleware.tenant);

departmentRouter.get(
  '/',
  authMiddleware.verifyPermission('depratment', 'view'),
  DepartrmentController.getAlldepartments
);
departmentRouter.post(
  '/',
  authMiddleware.verifyPermission('depratment', 'create'),
  validationMiddleware(createDepartmentInput),
  DepartrmentController.createDepartment
);
departmentRouter.patch(
  '/:id',
  authMiddleware.verifyPermission('depratment', 'edit'),
  validationMiddleware(createDepartmentInput),
  DepartrmentController.updateDepartment
);
departmentRouter.delete(
  '/:id',
  authMiddleware.verifyPermission('depratment', 'delete'),
  DepartrmentController.deleteDepartment
);
export default departmentRouter;
