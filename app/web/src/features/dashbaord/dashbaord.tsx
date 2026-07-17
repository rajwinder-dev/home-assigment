import { Link, useParams } from 'react-router';

import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import DashboardMatrices from './DashbaordMatrices';

const DashboardPage = () => {
  const { orgId } = useParams();
  return (
    <div>
      {/* Added a bit of structural spacing */}
      <PageHeader
        title="Dashboard"
        description="MVP overview of employees, progress, and recent updates."
      >
        <Button asChild>
          <Link to={`/org/${orgId}/employee`}>View all employees</Link>
        </Button>
      </PageHeader>
      <DashboardMatrices />
    </div>
  );
};

export default DashboardPage;
