import PageHeader from '@/components/PageHeader';
import { CreateEmployeeForm } from './CreateEmployeeForm';

export const CreateEmployeePage = (props: {}) => {
  return (
    <div>
      <PageHeader
        title="Create Employee"
        description="Enter employee details"
      ></PageHeader>
      <CreateEmployeeForm />
    </div>
  );
};
