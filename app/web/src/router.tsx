import { lazy } from 'react';
import { createBrowserRouter } from 'react-router'; // or "react-router-dom"

import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './features/home/HomePage';
import LoginPage from './features/auth/pages/LoginPage';
import SignupPage from './features/auth/pages/SignupPage';
import ForgetPasswordPage from './features/auth/pages/ForgetPasswordPage';
import ResetPasswordPage from './features/auth/pages/ResetPasswordPage';
import InviteMemberPage from './features/members/components/InviteMemberPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { DepartmentPage } from './features/department/DepartmentPage';
import EmployeePage from './features/employees/EmployeePage';
import { CreateEmployeePage } from './features/employees/CreateEmployeePage';
import { EditEmployeeForm } from './features/employees/EditEmployeeForm';
import EmployeeEditPage from './features/employees/EmployeeEditPage';

const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const OrganizationPage = lazy(
  () => import('./features/organization/pages/OrganizationPage'),
);
const CreateOrganizationPage = lazy(
  () => import('./features/organization/pages/CreateOrganizationPage'),
);

const OrgLayout = lazy(() => import('./layouts/OrgLayout'));
const DashboardPage = lazy(() => import('./features/dashbaord/dashbaord'));
const RolePage = lazy(() => import('./features/role/components/RolesPage'));
const ActivityPage = lazy(
  () => import('./features/activity/components/ActivityPage'),
);
const MembersPage = lazy(
  () => import('./features/members/components/MemberPage'),
);

const SettingsLayout = lazy(
  () => import('./features/setting/pages/SettingLayout'),
);
const ProfileTab = lazy(
  () => import('./features/setting/components/ProfileTab'),
);
const SecurityTab = lazy(
  () => import('./features/setting/components/tabs/SecurityTab'),
);
const OrganizationTab = lazy(
  () => import('./features/setting/components/tabs/OrganizationTab'),
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/forget-password',
    element: <ForgetPasswordPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPasswordPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/invite-user/:token',
    element: <InviteMemberPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/org',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <OrganizationPage /> },
          { path: 'new', element: <CreateOrganizationPage /> },
          {
            path: ':orgId',
            element: <OrgLayout />,
            errorElement: <ErrorBoundary />,
            children: [
              { index: true, element: <DashboardPage /> },
              { path: 'rbac', element: <RolePage /> },
              { path: 'activity', element: <ActivityPage /> },
              { path: 'department', element: <DepartmentPage /> },
              { path: 'employee', element: <EmployeePage /> },
              { path: 'employee/create', element: <CreateEmployeePage /> },
              {path: 'employee/:employeeId', element: <EmployeeEditPage />},
              {
                path: 'setting',
                element: <SettingsLayout />,
                children: [
                  { index: true, element: <ProfileTab /> },
                  { path: 'security', element: <SecurityTab /> },
                  { path: 'organization', element: <OrganizationTab /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
