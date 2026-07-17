export const permissions = {
  employee: [
    'create',
    'edit',
    'view',
    'delete',
    'assign',
    'view_self',
    'edit_self',
  ],
  activity: ['view'],
} as const;

export const modules = Object.keys(permissions) as Array<
  keyof typeof permissions
>;

export const defaultRoles = [
  {
    name: 'Employee',
    description: 'working employee under employee',
    permissions: { employee: ['view_self', 'edit_self'] },
  },
  {
    name: 'Admin',
    description: 'admin with full access',
    permissions: {
      activity: ['view'],
      employee: [
        'create',
        'edit',
        'view',
        'delete',
        'assign',
        'view_self',
        'edit_self',
      ],
    },
  },
  {
    name: 'Manger',
    description: 'hr manger can manger employees',
    permissions: { employee: ['create', 'edit', 'view'] },
  },
];
