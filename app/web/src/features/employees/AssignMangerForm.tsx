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
  currentManagerId?: string;
  orgId: string | undefined;
}

export function AssignManagerForm({
  open,
  onOpenChange,
  employeeId,
  currentManagerId,
  orgId,
}: Props) {
  const { managersData, isLoadingMangers } = useLookupHook({ orgId });
  const [managerId, setManagerId] = useState<string | undefined>(
    currentManagerId,
  );
  const { updateMangerMutate, isUpdatingManager } = useEmployee({ orgId });
  const handleSubmit = () => {
    if (!managerId) return;
    updateMangerMutate(
      { userId: employeeId, mangerId: managerId },
      {
        onSuccess: () => toast.success('Manager updated successfully'),
        onError: (error) => toast.error(error.message),
      },
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Assign manager</DialogTitle>
          <DialogDescription>
            Choose a manager to assign to this employee.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-2">
          <Label htmlFor="manager">Manager</Label>
          {isLoadingMangers ? (
            <Skeleton className="h-9 w-full" />
          ) : (
            <Select value={managerId} onValueChange={setManagerId}>
              <SelectTrigger id="manager" className="w-full">
                <SelectValue placeholder="Select a manager" />
              </SelectTrigger>
              <SelectContent>
                {managersData?.data.map((manager) => (
                  <SelectItem key={manager.id} value={manager.id}>
                    {manager.name}
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
          <Button onClick={handleSubmit} disabled={isUpdatingManager}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
