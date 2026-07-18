import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { devMode } from './config/appConfig.js';
import { env } from './config/env.js';

import { appError } from './core/utils/appError.js';
import { globalHandler } from './core/utils/globalHandler.js';

import { toNodeHandler } from 'better-auth/node';
import { DevMiddleware } from './core/middleware/devMiddleware.js';
import ActivityRouter from './modules/activity/activity.routes.js';
import dashboardRouter from './modules/dashboard/dashboard.route.js';
import memberRouter from './modules/member/member.routes.js';
import organizationRouter from './modules/organizations/organization.routes.js';
import roleRouter from './modules/role/role.route.js';
import tokenRoute from './modules/token/token.routes.js';
import userRouter from './modules/user/user.routes.js';
import lookupRouter from './modules/lookup/lookup.routes.js';
import { auth } from './lib/auth.js';
import { configLogger } from './core/utils/logger.js';
import { prisma } from '@org/database';
import departmentRouter from './modules/department/department.routes.js';

export const app: Express = express();

// dev logs
if (devMode) app.use(morgan('dev'));
// security
app.set('trust proxy', 1);
app.use(helmet());
app.use(hpp());

configLogger(app);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 500,
  standardHeaders: true,
  message: 'Too many requests from this IP , please try again in an hour!',
});
if (!devMode) app.use(limiter);

app.use(
  cors({
    origin: env.coreURL,
    credentials: true,
  }),
);
app.set('view engine', 'ejs');
app.use('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
// custom middleware
if (devMode) app.use(DevMiddleware.logRequests);

//  Routes:w
//
// routes/health.js
app.get('/health', async (req, res) => {
  try {
    await prisma.$executeRaw`SELECT 1`;
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
  } catch (err) {
    res.status(503).json({ status: 'error', message: 'DB unreachable' });
  }
});

app.use('/api/v1/token', tokenRoute);
app.use('/api/v1/org', organizationRouter);
app.use('/api/v1/department', departmentRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/role', roleRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/member', memberRouter);
app.use('/api/v1/activity', ActivityRouter);
app.use('/api/v1/lookup', lookupRouter);

app.all(/(.*)/, (req, _res, next) => {
  return next(
    new appError(
      `Can't find ${req.originalUrl} on this server!`,
      404,
      'INVALID_ROUTE',
    ),
  );
});
Sentry.setupExpressErrorHandler(app);
app.use(globalHandler);
export default app;
