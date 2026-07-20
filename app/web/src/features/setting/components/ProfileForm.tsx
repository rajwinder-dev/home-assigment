// ProfileForm.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dirtyValues } from '@/lib/utils';
import { useUser } from '@org/core';
import type { UpdateMyDetailsInput } from '@org/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import AvatarUpload from './AvaterUpload';

const ProfileForm = () => {
  const { userDetails, updateMyDetails, isUpdating } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<UpdateMyDetailsInput>({
    defaultValues: {
      phoneNo: userDetails?.data.phoneNo ?? undefined,
      location: userDetails?.data.location ?? undefined,
    },
  });

  // userDetails resolves asynchronously, so defaultValues at mount
  // won't have the real data yet — reset the form once it arrives.
  useEffect(() => {
    if (userDetails?.data) {
      reset({
        phoneNo: userDetails.data.phoneNo ?? undefined,
        location: userDetails.data.location ?? undefined,
      });
    }
  }, [userDetails?.data, reset]);

  const onSubmit = (data: UpdateMyDetailsInput) => {
    const output = dirtyValues(dirtyFields, data);
    updateMyDetails(output, {
      onSuccess: () => toast.success('Profile updated successfully'),
      onError: (error) => toast.error(error.message),
    });
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Update your personal information. Only changed fields will be saved.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {userDetails?.data && (
          <AvatarUpload
            avatarUrl={userDetails.data.avatar}
            username={userDetails.data.username}
            email={userDetails.data.email}
          />
        )}

        <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNo">Phone Number</Label>
              <Input id="phoneNo" {...register('phoneNo')} />
              {errors.phoneNo && (
                <p className="text-xs text-red-500">{errors.phoneNo.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...register('location')}
                placeholder="City, Country"
              />
              {errors.location && (
                <p className="text-xs text-red-500">{errors.location.message}</p>
              )}
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2">
        <p className="text-muted-foreground text-end text-[10px] italic">
          Modified fields: {Object.keys(dirtyFields).join(', ') || 'None'}
        </p>
        <Button
          type="submit"
          form="profile-form"
          disabled={Object.keys(dirtyFields).length === 0 || isUpdating}
        >
          {isUpdating ? 'Updating...' : 'Update profile'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileForm;
