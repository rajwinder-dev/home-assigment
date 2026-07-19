export const ROLES = {
  ADMIN: 'super_admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
};

// What roles each role is allowed to ASSIGN to others
export const ASSIGNABLE_ROLES = {
  [ROLES.ADMIN]: [ROLES.MANAGER, ROLES.EMPLOYEE],
  [ROLES.MANAGER]: [ROLES.EMPLOYEE],
  [ROLES.EMPLOYEE]: [], // cannot assign anything
};

