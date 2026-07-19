import { Pagination } from '@/components/Pagination';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';

import { useEmployee, useLookupHook } from '@org/core';
import { useParams } from 'react-router';
import { Avatar } from '../members/components/MemberBandges';
import { RowActionsMenu } from './RowActionsMenu';

export function EmployeeTable() {
  const { orgId } = useParams();
  const { rolesData } = useLookupHook({ orgId });
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 20,
  });
  const [roleId, setRoleId] = useState<string | undefined>();

  const { employees, isLoadingEmployees } = useEmployee({
    filterOptions: {
      offset: pagination.offset,
      limit: pagination.limit,
      filter: {
        ...(roleId && roleId !== 'ALL' && { roleId }),
      },
    },
    orgId,
  });

  return (
    <>
      <div className="flex flex-wrap items-center justify-end gap-2 p-2">
        {/* Role filter */}
        <Select onValueChange={setRoleId} disabled={isLoadingEmployees}>
          <SelectTrigger className="h-8 w-32 text-xs">
            <SelectValue placeholder="All roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All roles</SelectItem>
            {rolesData?.data.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Invite / Add employee */}
      </div>
      <div className="flex-1">
        <ScrollArea className="h-[calc(100vh-261px)]">
          <Table className="border-border border">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead className="text-right">Salary</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoadingEmployees ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <TableRow key={idx} className="hover:bg-transparent">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                        <div className="space-y-1.5">
                          <Skeleton className="h-3.5 w-24" />
                          <Skeleton className="h-3 w-36" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-20 rounded-md" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-16 rounded-md" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-3.5 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-3.5 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="ml-auto h-4 w-10" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-3.5 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-14 rounded-md" />
                    </TableCell>
                    <TableCell className="pr-3">
                      <Skeleton className="ml-auto h-8 w-8 rounded-md" />
                    </TableCell>
                  </TableRow>
                ))
              ) : employees?.data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-muted-foreground py-10 text-center text-sm"
                  >
                    No employees match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                employees?.data.map((employee, i) => {
                  return (
                    <TableRow key={employee.id} className="group/row">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar
                            name={employee.user.name ?? 'User'}
                            index={i}
                          />
                          <div>
                            <p className="text-sm leading-tight font-medium">
                              {employee.user.name ?? 'Unknown User'}
                            </p>
                            <p className="text-muted-foreground text-[11px]">
                              {employee.user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {employee.department?.name ?? (
                          <span className="text-muted-foreground/50 text-[11px]">
                            —
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge>{employee.role?.name}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {employee.designation || (
                          <span className="text-muted-foreground/50 text-[11px]">
                            —
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {employee.repotingManger?.name ?? (
                          <span className="text-muted-foreground/50 text-[11px]">
                            —
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right text-sm font-medium">
                        {employee.salary.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                        {employee.joiningDate
                          ? new Date(employee.joiningDate).toLocaleDateString()
                          : ''}
                      </TableCell>
                      <TableCell>
                        <Badge variant={employee.active ? 'default' : 'secondary'}>
                          {employee.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="pr-3">
                        <RowActionsMenu employee={employee} />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      {employees && !isLoadingEmployees && (
        <Pagination
          limit={employees?.limit}
          total={employees?.total}
          offset={employees?.offset}
          onChange={setPagination}
        />
      )}
    </>
  );
}
