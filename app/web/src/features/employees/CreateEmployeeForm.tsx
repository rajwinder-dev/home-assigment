import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createEmployeeInput, type CreateEmployeeInput } from '@org/zod';
import { useEmployee, useLookupHook } from '@org/core';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
] as const;

export function CreateEmployeeForm() {
  const { orgId } = useParams();
  const { createEmployee } = useEmployee({ orgId });
  const {
    rolesData,
    departmentsData,
    managersData,
    isLoadingMangers,
    isLoadingDepartments,
    isLoadingRoles,
  } = useLookupHook({ orgId });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createEmployeeInput.bodySchema),
  });

  const onSubmit = (data: CreateEmployeeInput) => {
    createEmployee(data, {
      onSuccess: () => {
        toast.success('Employee created successfully');
        navigate(`/org/${orgId}/employee`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-8">
      {/* Username */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="jdoe"
            {...register('username')}
            className={errors.username ? 'border-destructive' : ''}
          />
          {errors.username && (
            <p className="text-destructive text-xs">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register('email')}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-destructive text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Phone number */}
        <div className="space-y-2">
          <Label htmlFor="phoneNo">Phone number</Label>
          <Input
            id="phoneNo"
            type="tel"
            placeholder="+1 555 000 0000"
            {...register('phoneNo')}
            className={errors.phoneNo ? 'border-destructive' : ''}
          />
          {errors.phoneNo && (
            <p className="text-destructive text-xs">{errors.phoneNo.message}</p>
          )}
        </div>

        {/* Avatar URL */}
        <div className="space-y-2">
          <Label htmlFor="avatar">Avatar URL</Label>
          <Input
            id="avatar"
            type="url"
            placeholder="https://example.com/avatar.png"
            {...register('avatar')}
            className={errors.avatar ? 'border-destructive' : ''}
          />
          {errors.avatar && (
            <p className="text-destructive text-xs">{errors.avatar.message}</p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  id="gender"
                  className={
                    errors.gender ? 'border-destructive w-full' : 'w-full'
                  }
                >
                  <SelectValue placeholder="Select a gender" />
                </SelectTrigger>
                <SelectContent>
                  {GENDER_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && (
            <p className="text-destructive text-xs">{errors.gender.message}</p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City, Country"
            {...register('location')}
            className={errors.location ? 'border-destructive' : ''}
          />
          {errors.location && (
            <p className="text-destructive text-xs">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Designation */}
        <div className="space-y-2">
          <Label htmlFor="designation">Designation</Label>
          <Input
            id="designation"
            placeholder="Software Engineer"
            {...register('designation')}
            className={errors.designation ? 'border-destructive' : ''}
          />
          {errors.designation && (
            <p className="text-destructive text-xs">
              {errors.designation.message}
            </p>
          )}
        </div>

        {/* Salary */}
        <div className="space-y-2">
          <Label htmlFor="salary">Salary</Label>
          <Input
            id="salary"
            type="number"
            step="any"
            placeholder="50000"
            {...register('salary', { valueAsNumber: true })}
            className={errors.salary ? 'border-destructive' : ''}
          />
          {errors.salary && (
            <p className="text-destructive text-xs">{errors.salary.message}</p>
          )}
        </div>

        {/* Joining date */}
        <div className="space-y-2">
          <Label htmlFor="joiningDate">Joining date</Label>
          <Input
            id="joiningDate"
            type="date"
            {...register('joiningDate', { valueAsDate: true })}
            className={errors.joiningDate ? 'border-destructive' : ''}
          />
          {errors.joiningDate && (
            <p className="text-destructive text-xs">
              {errors.joiningDate.message}
            </p>
          )}
        </div>

        {/* Role */}
        <div className="space-y-2">
          <Label htmlFor="roleId">Role</Label>
          <Controller
            name="roleId"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoadingRoles}
              >
                <SelectTrigger
                  id="roleId"
                  className={
                    errors.roleId ? 'border-destructive w-full' : 'w-full'
                  }
                >
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {rolesData?.data.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.roleId && (
            <p className="text-destructive text-xs">{errors.roleId.message}</p>
          )}
        </div>

        {/* Department */}
        <div className="space-y-2">
          <Label htmlFor="deptid">Department</Label>
          <Controller
            name="deptid"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoadingDepartments}
              >
                <SelectTrigger
                  id="deptid"
                  className={
                    errors.deptid ? 'border-destructive w-full' : 'w-full'
                  }
                >
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  {departmentsData?.data.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.deptid && (
            <p className="text-destructive text-xs">{errors.deptid.message}</p>
          )}
        </div>

        {/* Manager */}
        <div className="space-y-2">
          <Label htmlFor="managerId">Manager</Label>
          <Controller
            name="managerId"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoadingMangers}
              >
                <SelectTrigger
                  id="managerId"
                  className={
                    errors.managerId ? 'border-destructive w-full' : 'w-full'
                  }
                >
                  <SelectValue placeholder="Select a manager (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {managersData?.data.map((manager) => (
                    <SelectItem key={manager.id} value={manager.id}>
                      {manager.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.managerId && (
            <p className="text-destructive text-xs">
              {errors.managerId.message}
            </p>
          )}
        </div>

        {/* Reporting manager */}
        <div className="space-y-2">
          <Label htmlFor="reportingManagerId">Reporting manager</Label>
          <Controller
            name="reportingManagerId"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoadingMangers}
              >
                <SelectTrigger
                  id="reportingManagerId"
                  className={
                    errors.reportingManagerId
                      ? 'border-destructive w-full'
                      : 'w-full'
                  }
                >
                  <SelectValue placeholder="Select a reporting manager (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {managersData?.data.map((manager) => (
                    <SelectItem key={manager.id} value={manager.id}>
                      {manager.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.reportingManagerId && (
            <p className="text-destructive text-xs">
              {errors.reportingManagerId.message}
            </p>
          )}
        </div>
        <div className="flex gap-4 pt-2 justify-end items-center">
          <Button
            type="button"
            variant={'secondary'}
            className="flex-1"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Create Employee
          </Button>
        </div>
      </div>
    </form>
  );
}
