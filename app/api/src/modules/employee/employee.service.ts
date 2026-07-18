import { CreateEmployeeInput } from '@org/zod';
import { auth } from '../../lib/auth.js';
import { prisma } from '@org/database';
export class EmployeeService {
  static async creteEmployee({
    input,
    organizationId,
  }: {
    input: CreateEmployeeInput;
    organizationId: string;
    createdBy: string;
  }) {
    let employeeId: string;

    const existAccount = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existAccount) {
      employeeId = existAccount.id;
    } else {
      const data = await auth.api.signUpEmail({
        body: {
          name: input.username,
          email: input.email,
          password: '12345678',
        },
      });
      employeeId = data.user.id;
    }
    //TODO: implemente trnasiction

    // join organization
    const data = await prisma.$transaction(async (tx) => {
      const membership = await tx.membership.create({
        data: {
          userId: employeeId,
          roleId: input.roleId,
          departmentId: input.deptid,
          managerId: input.managerId,
          organizationId,
          salary: input.salary,
          designation: input.designation,
          joiningDate: input.joiningDate,
        },
      });
      // update other information in database
      //
      const userData = await tx.user.update({
        where: { id: employeeId },
        data: {
          gender: input.gender,
          location: input.location,
          avatar: input.avatar,
        },
      });
      return { membership, userData };
    });

    return data;
  }
}
