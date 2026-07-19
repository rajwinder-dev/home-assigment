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
employeeRouter.get(
  '/tree',
  authMiddleware.verifyPermission('employee', 'view'),
  EmployeeController.getorgTree,
);
employeeRouter.post(
  '/',
  authMiddleware.verifyPermission('employee', 'create'),
  EmployeeController.createEmployee,
);
employeeRouter.delete(
  '/:id',
  authMiddleware.verifyPermission('employee', 'delete'),
  EmployeeController.deleteEmployee,
);

employeeRouter.patch(
  '/:roleId/role/:userId',
  authMiddleware.restrictToOwner,
  EmployeeController.updateRole,
);
employeeRouter.patch(
  '/:mangerMembershipId/manager/:userId',
  authMiddleware.restrictToOwner,
  EmployeeController.updateManager,
);

export default employeeRouter;
