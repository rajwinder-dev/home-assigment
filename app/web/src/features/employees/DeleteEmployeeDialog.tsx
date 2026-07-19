import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useEmployee } from '@org/core';
import { toast } from 'sonner';
import { useParams } from 'react-router';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: string;
  employeeName: string;
}

export function DeleteEmployeeDialog({
  open,
  onOpenChange,
  employeeId,
  employeeName,
}: Props) {
  const { orgId } = useParams();
  const { deleteEmployee, isDeletingEmployee } = useEmployee({ orgId });
  const handleDelete = () => {
    deleteEmployee(employeeId, {
      onSuccess: () => toast.success('Employee deleted successfully'),
      onError: (error) => toast.error(error.message),
    });
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {employeeName}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove{' '}
            {employeeName} and all associated records from your organization.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeletingEmployee}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
