import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserPlus } from 'lucide-react';
import { CreateEmployeeForm } from './CreateEmployeeForm';
import { useNavigate } from 'react-router';

export default function EmployeePage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-1 flex-col">
      {/* Page header */}
      <PageHeader
        title="Employee"
        description="Create Employee and manage them."
      >
        <Button
          size="sm"
          className="ml-auto h-8 gap-1.5 text-xs"
          onClick={() => navigate("create")}
        >
          <UserPlus size={13} />
          Create Employee
        </Button>
      </PageHeader>
      {/* Analytics strip */}
      {/* Table card */}
      {/* {selected.size > 0 && <BulkActionsBar />} */}
    </div>
  );
}
