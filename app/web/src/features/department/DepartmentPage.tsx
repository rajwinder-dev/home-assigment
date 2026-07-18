import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { CreateDepartmentForm } from './CreateDepartmentForm';
import PageHeader from '@/components/PageHeader';
import { DepartmentsTable } from './DepartmentTable';

export const DepartmentPage = () => {
  const [openCreateDepartment, setOpenCreateDepartment] = useState(false);

  return (
    <div className="flex flex-1 flex-col">
      {/* Page header */}
      <PageHeader
        title="Departments"
        description="Manage departments, create and manage them."
      >
        <Button
          size="sm"
          className="ml-auto h-8 gap-1.5 text-xs"
          onClick={() => setOpenCreateDepartment(true)}
        >
          <UserPlus size={13} />
          Create department
        </Button>
        <Dialog
          onOpenChange={setOpenCreateDepartment}
          open={openCreateDepartment}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create department</DialogTitle>
              <DialogDescription>
                Add a new department to your organization by giving it a name
                and an optional description.
              </DialogDescription>
            </DialogHeader>
            <CreateDepartmentForm
              onclose={() => setOpenCreateDepartment(false)}
            />
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Table card */}
      <DepartmentsTable />
      {/* {selected.size > 0 && <BulkActionsBar />} */}
    </div>
  );
};
