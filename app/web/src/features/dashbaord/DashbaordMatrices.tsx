import { Skeleton } from "@/components/ui/skeleton"; // Adjust this path based on your setup
import  {useDashboard} from "@org/core"
import { useParams } from "react-router";
const DashboardMatrices = () => {
  const {orgId} = useParams()
  const { summary, isLoadingSummary } = useDashboard({orgId});

  const metrics = [
    { label: "Total employees", value: summary?.data.totalEmployees },
    { label: "Inactive employees", value: summary?.data.inactiveEmployes},
    { label: "Active employee", value: summary?.data.activeEmployes },
    { label: "Departments", value: summary?.data.departments },
  ];

  return (
    <div className="grid border md:grid-cols-2 xl:grid-cols-4">
      {isLoadingSummary
        ? // Render 5 loading skeletons that match the exact grid layout
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 p-4 ${i < 4 ? "xl:border-r" : ""} border-b md:border-b-0`}
            >
              <Skeleton className="h-4 w-16" /> {/* Skeleton for the label */}
              <Skeleton className="h-5 w-10" /> {/* Skeleton for the value */}
            </div>
          ))
        : // Render actual data once loading is finished
          metrics.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 p-4 ${i < 4 ? "xl:border-r" : ""} border-b md:border-b-0`}
            >
              <p className="text-muted-foreground text-sm">{item.label}:</p>
              <p className="font-semibold tracking-tight text-orange-600">{item.value}</p>
            </div>
          ))}
    </div>
  );
};

export default DashboardMatrices;
