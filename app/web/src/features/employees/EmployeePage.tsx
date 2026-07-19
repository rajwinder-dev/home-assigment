import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { EmployeeTable } from './EmployeeTable';

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
      <EmployeeTable />
      {/* Analytics strip */}
      {/* Table card */}
      {/* {selected.size > 0 && <BulkActionsBar />} */}
    </div>
  );
}
