import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useDepartment } from '@org/core';
import { useParams } from 'react-router';
import { EditDepartmentForm } from './EditDepartmentForm';

interface Department {
  id: string;
  name: string;
  description?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export function DepartmentsTable() {
  const { orgId } = useParams();
  const { departments, isLoadingDepartments, errorLoadingDepartments } =
    useDepartment({
      orgId,
    });
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null,
  );
  if (errorLoadingDepartments)
    return (
     <div className="text-red-500 flex justify-center p-4">{errorLoadingDepartments.message}</div>
    );
  return (
    <>
      <div className="flex-1">
        <ScrollArea className="h-[calc(100vh-261px)]">
          <Table className="border-border border">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Updated at</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingDepartments ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <TableRow key={idx} className="hover:bg-transparent">
                    <TableCell>
                      <Skeleton className="h-3.5 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-3.5 w-48" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-3.5 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-3.5 w-16" />
                    </TableCell>
                    <TableCell className="pr-3">
                      <Skeleton className="ml-auto h-8 w-8 rounded-md" />
                    </TableCell>
                  </TableRow>
                ))
              ) : departments?.data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-muted-foreground py-10 text-center text-sm"
                  >
                    No departments match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                departments?.data.map((department) => {
                  const isSelected = false;
                  return (
                    <TableRow
                      key={department.id}
                      className={cn(
                        'group/row',
                        isSelected && 'bg-violet-50/60 dark:bg-violet-900/10',
                      )}
                    >
                      <TableCell>
                        <p className="text-sm leading-tight font-medium capitalize">
                          {department.name}
                        </p>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {department.description ?? (
                          <span className="text-muted-foreground/50 text-[11px]">
                            —
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                        {new Date(department.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                        {new Date(department.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="pr-3">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="ml-auto h-8 w-8"
                          onClick={() => setEditingDepartment(department)}
                        >
                          <Pencil size={14} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      <Dialog
        open={!!editingDepartment}
        onOpenChange={(open) => !open && setEditingDepartment(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit department</DialogTitle>
            <DialogDescription>
              Update the department's name or description.
            </DialogDescription>
          </DialogHeader>
          {editingDepartment && (
            <EditDepartmentForm
              department={editingDepartment}
              onclose={() => setEditingDepartment(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
