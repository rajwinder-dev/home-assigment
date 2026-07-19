import { Pagination } from '@/components/Pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { ArrowDown, ArrowUp, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useEmployee, useLookupHook } from '@org/core';
import { useParams } from 'react-router';
import { Avatar } from '../members/components/MemberBandges';
import { RowActionsMenu } from './RowActionsMenu';
import { FilterOptions } from '@/types/axis.types';

const SORT_FIELDS = [
  { value: 'joiningDate', label: 'Joining date' },
  { value: 'name', label: 'Name' },
] as const;

const STATUS_OPTIONS = [
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Inactive' },
] as const;

export function EmployeeTable() {
  const { orgId } = useParams();
  const { rolesData, departmentsData } = useLookupHook({ orgId });

  const [pagination, setPagination] = useState({ offset: 0, limit: 20 });
  const [roleId, setRoleId] = useState<string | undefined>();
  const [deptId, setDeptId] = useState<string | undefined>();
  const [active, setActive] = useState<string | undefined>();
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [sortby, setSortby] = useState<string | undefined>('joiningDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // debounce search input -> search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput.trim());
      setPagination((p) => ({ ...p, offset: 0 }));
    }, 350);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const filterOptions: FilterOptions = {
    offset: pagination.offset,
    limit: pagination.limit,
    filter: {
      ...(roleId && roleId !== 'ALL' && { roleId }),
      ...(deptId && deptId !== 'ALL' && { departmentId: deptId }),
      ...(active && active !== 'ALL' && { active }),
    },
    ...(search && { search: { searchBy: 'name', search } }),
    ...(sortby && { sorting: { sortby, sortOrder } }),
  };

  const { employees, isLoadingEmployees } = useEmployee({
    filterOptions,
    orgId,
  });

  const toggleSortOrder = () =>
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2 p-2">
        {/* Search */}
        <div className="relative w-56">
          <Search className="text-muted-foreground absolute top-1/2 left-2 h-3.5 w-3.5 -translate-y-1/2" />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name..."
            className="h-8 pl-7 text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Department filter */}
          <Select
            onValueChange={(v) => {
              setDeptId(v);
              setPagination((p) => ({ ...p, offset: 0 }));
            }}
            disabled={isLoadingEmployees}
          >
            <SelectTrigger className="h-8 w-36 text-xs">
              <SelectValue placeholder="All departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All departments</SelectItem>
              {departmentsData?.data.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Role filter */}
          <Select
            onValueChange={(v) => {
              setRoleId(v);
              setPagination((p) => ({ ...p, offset: 0 }));
            }}
            disabled={isLoadingEmployees}
          >
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

          {/* Status filter */}
          <Select
            onValueChange={(v) => {
              setActive(v);
              setPagination((p) => ({ ...p, offset: 0 }));
            }}
            disabled={isLoadingEmployees}
          >
            <SelectTrigger className="h-8 w-28 text-xs">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All status</SelectItem>
              {STATUS_OPTIONS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort field */}
          <Select
            value={sortby}
            onValueChange={(v) => setSortby(v)}
            disabled={isLoadingEmployees}
          >
            <SelectTrigger className="h-8 w-36 text-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_FIELDS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort order toggle */}
          <Button
            variant="outline"
            size="icon-sm"
            className="h-8 w-8"
            onClick={toggleSortOrder}
            disabled={!sortby || isLoadingEmployees}
            aria-label="Toggle sort order"
          >
            {sortOrder === 'asc' ? (
              <ArrowUp className="h-3.5 w-3.5" />
            ) : (
              <ArrowDown className="h-3.5 w-3.5" />
            )}
          </Button>

          {/* Invite / Add employee */}
        </div>
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
                        <Badge
                          variant={employee.active ? 'default' : 'secondary'}
                        >
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
