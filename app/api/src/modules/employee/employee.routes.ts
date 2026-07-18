import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware.js';
import { EmployeeController } from './employee.controller.js';

const employeeRouter: Router = Router();
employeeRouter.use(authMiddleware.protectedRoute);
employeeRouter.use(authMiddleware.tenant);

employeeRouter.get(
  '/',
  authMiddleware.verifyPermission('employee', 'view'),
  EmployeeController.getAllEmployees,
);
employeeRouter.post(
  '/',
  authMiddleware.verifyPermission('employee', 'create'),
  EmployeeController.createEmployee,
);
employeeRouter.patch(
  '/:roleId/roles/:userId',
  authMiddleware.restrictToOwner,
  EmployeeController.updateRole,
);

export default employeeRouter;
