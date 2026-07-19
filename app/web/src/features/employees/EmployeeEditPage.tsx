import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { EmployeeTable } from './EmployeeTable';
import { EditEmployeeForm } from './EditEmployeeForm';

export default function EmployeeEditPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-1 flex-col">
      {/* Page header */}
      <PageHeader
        title="Edit employee"
        description="Edit employee"
      >
        <Button
          size="sm"
          className="ml-auto h-8 gap-1.5 text-xs"
          variant={"secondary"}
          onClick={() => navigate("create")}
        >
          Back
        </Button>
      </PageHeader>
      {/* <EditEmployeeForm /> */}
      {/* Analytics strip */}
      {/* Table card */}
      {/* {selected.size > 0 && <BulkActionsBar />} */}
    </div>
  );
}
