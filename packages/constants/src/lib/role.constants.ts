export const ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
};

// What roles each role is allowed to ASSIGN to others
export const ASSIGNABLE_ROLES = {
  [ROLES.OWNER]: [ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE],
  [ROLES.ADMIN]: [ROLES.MANAGER, ROLES.EMPLOYEE],
  [ROLES.MANAGER]: [ROLES.EMPLOYEE],
  [ROLES.EMPLOYEE]: [], // cannot assign anything
};

