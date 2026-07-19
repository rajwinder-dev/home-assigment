import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useEmployee, useLookupHook } from '@org/core';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: string;
  currentRoleId?: string;
  orgId: string | undefined;
}

export function AssignRoleForm({
  open,
  onOpenChange,
  employeeId,
  currentRoleId,
  orgId,
}: Props) {
  const { rolesData, isLoadingRoles } = useLookupHook({ orgId });
  const [roleId, setRoleId] = useState<string | undefined>(currentRoleId);
  const { updateRoleMutate, isUpdatingRole } = useEmployee({ orgId });
  const handleSubmit = () => {
    if (!roleId) return;
    updateRoleMutate(
      { userId: employeeId, roleId: roleId },
      {
        onSuccess: () => toast.success('Role updated successfully'),
        onError: (error) => toast.error(error.message),
      },
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Assign role</DialogTitle>
          <DialogDescription>
            Choose a role to assign to this employee.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-2">
          <Label htmlFor="role">Role</Label>
          {isLoadingRoles ? (
            <Skeleton className="h-9 w-full" />
          ) : (
            <Select value={roleId} onValueChange={setRoleId}>
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {rolesData?.data.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isUpdatingRole}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
