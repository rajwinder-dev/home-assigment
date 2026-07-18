import { CreateDepartmentInput, UpdateDepartmentInput } from '@org/zod';
import { catchAsync } from '../../core/utils/catchAsync.js';
import response from '../../core/utils/response.js';
import { DepartmentService } from './department.service.js';

export class DepartrmentController {
  static getAlldepartments = catchAsync(async (req, res, _next) => {
    const data = await DepartmentService.getall({
      organizationId: req.organization.id,
    });
    response(res, data, 200);
  });
  static createDepartment = catchAsync(async (req, res, _next) => {
    const input = req.body as CreateDepartmentInput;
    const data = await DepartmentService.create({
      input,
      organizationId: req.organization.id,
      userId: req.user.id,
    });
    response(res, data, 201);
  });
  static updateDepartment = catchAsync(async (req, res, _next) => {
    const input = req.body as UpdateDepartmentInput;
    const id = req.params.id as string;
    const data = await DepartmentService.update({
      input,
      organizationId: req.organization.id,
      id
    });
    response(res, data, 200);
  })
  static deleteDepartment = catchAsync(async (req, res, _next) => {
    const id = req.params.id as string;
    const data = await DepartmentService.delete({
      id,
      organizationId: req.organization.id      
    })    
    response(res, data, 200);
  }) 
}
