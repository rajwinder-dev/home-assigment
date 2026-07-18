'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  createDepartmentInput,
  UpdateDepartmentInput,
  type CreateDepartmentInput,
} from '@org/zod';
import { useDepartment } from '@org/core';
import { useParams } from 'react-router';
import { toast } from 'sonner';

interface Department {
  id: string;
  name: string;
  description?: string;
}

interface props {
  department: Department;
  onclose: () => void;
}

export function EditDepartmentForm({ department, onclose }: props) {
  const { orgId } = useParams();
  const { updateDepartment, isUpdatingDepartment } = useDepartment({
    orgId,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDepartmentInput>({
    resolver: zodResolver(createDepartmentInput.bodySchema),
    defaultValues: {
      name: department.name,
      description: department.description ?? '',
    },
  });

  const onSubmit = async (data: UpdateDepartmentInput) => {
    updateDepartment(
      { id: department.id, data },
      {
        onSuccess: () => {
          toast.success('Department updated successfully');
          onclose();
        },
        onError: (error) => toast.error(error.message),
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="e.g. Customer Support"
          {...register('name')}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p className="text-destructive text-xs">{errors.name.message}</p>
        )}
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="What does this department handle? (optional)"
          {...register('description')}
          className={errors.description ? 'border-destructive' : ''}
        />
        {errors.description && (
          <p className="text-destructive text-xs">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant={'secondary'}
          className="flex-1"
          onClick={onclose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isUpdatingDepartment}
          className="flex-1"
        >
          {isUpdatingDepartment ? 'Saving...' : 'Save changes'}
        </Button>
      </div>
    </form>
  );
}
