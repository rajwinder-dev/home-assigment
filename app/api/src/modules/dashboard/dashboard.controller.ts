import { statusCountsSchema } from '@org/zod';
import { catchAsync } from '../../core/utils/catchAsync.js';
import response from '../../core/utils/response.js';

export class dashboardController {
  static getSummary = catchAsync(async (req, res, _next) => {
    response(res, null, 200, { schema: statusCountsSchema });
  });
}
