import { lookupSchema } from "@org/zod";
import z from "zod";
import { catchAsync } from "../../core/utils/catchAsync.js";
import response from "../../core/utils/response.js";
import { prisma } from "@org/database";

export class LookupController {
  static getRoles = catchAsync(async (req, res, _next) => {
    const data = await prisma.role.findMany({
      where: {
        organizationId: req.organization.id,
      },
      select: {
        id: true,
        name: true,
      },
    });
    const output = data.map((item) => ({ id: item.id, name: item.name }));
    response(res, output, 200, { schema: z.array(lookupSchema) });
  });
}
