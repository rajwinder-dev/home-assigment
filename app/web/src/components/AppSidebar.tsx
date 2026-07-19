import { NavMain } from '@/components/nav-main';
import { OrganizationSwitcher } from '@/components/OrganizationSwitcher';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  Activity01Icon,
  DashboardSquare01Icon,
  SecurityLockIcon,
  Settings05Icon,
  UserGroupIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import * as React from 'react';
const navMainItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />,
  },
  {
    title: 'Departments',
    url: '/department',
    icon: <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />,
  },

  {
    title: 'Employees',
    url: '/employee',
    icon: <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />,
  },
  {
    title: 'Roles & Permissions',
    url: '/rbac',
    icon: <HugeiconsIcon icon={SecurityLockIcon} strokeWidth={2} />,
  },
  {
    title: 'Settings',
    url: '/setting',
    icon: <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
