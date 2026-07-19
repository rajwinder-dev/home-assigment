import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, ShieldCheck, UserCog, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { AssignRoleForm } from './AssignRoleForm';
import { DeleteEmployeeDialog } from './DeleteEmployeeDialog';
import { EmployeeResponseSchema } from '@org/zod';
import { useParams } from 'react-router';
import { AssignManagerForm } from './AssignMangerForm';

interface Props {
  employee: EmployeeResponseSchema;
}

export function RowActionsMenu({ employee }: Props) {
  const {orgId} = useParams()
  const [openAssignRole, setOpenAssignRole] = useState(false);
  const [openAssignManager, setOpenAssignManager] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Open employee actions">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onSelect={() => setOpenAssignRole(true)}>
            <ShieldCheck className="mr-2 h-4 w-4" />
            Assign role
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setOpenAssignManager(true)}>
            <UserCog className="mr-2 h-4 w-4" />
            Assign manager
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setOpenDelete(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete employee
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AssignRoleForm
        open={openAssignRole}
        onOpenChange={setOpenAssignRole}
        employeeId={employee.user.id}
        currentRoleId={employee.role?.id}
        orgId={orgId}
      />
      <AssignManagerForm
        open={openAssignManager}
        onOpenChange={setOpenAssignManager}
        employeeId={employee.user.id}
        currentManagerId={employee.repotingManger?.name}
        orgId={orgId}
      />
      <DeleteEmployeeDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        employeeId={employee.user.id}
        employeeName={employee.user.name ?? 'this employee'}
      />
    </>
  );
}
