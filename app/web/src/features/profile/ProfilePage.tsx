import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { employeeApi, useUser } from '@org/core';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Briefcase, Calendar, Mail, MapPin, Phone, User } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const ProfilePage = () => {
  const { orgId } = useParams();
  const { userDetails, isLoading: isLoadingUser } = useUser();

  const { data: membershipData, isLoading: isLoadingMembership } = useQuery({
    queryKey: [
      'profile',
      {
        userId: userDetails?.data.id,
        orgId,
      },
    ],
    queryFn: employeeApi.getMyDetails,
    enabled: Boolean(userDetails?.data.id && orgId),
  });

  const user = userDetails?.data;
  const membership = membershipData?.data;

  if (isLoadingUser) {
    return <ProfilePageSkeleton />;
  }

  if (!user) {
    return (
      <div className="text-muted-foreground mx-auto max-w-2xl py-10 text-center">
        Unable to load profile.
      </div>
    );
}

  const initials = (user.username || user.email || '?')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className=" w-full max-w-2xl space-y-6 p-6">
      {/* Header: avatar + identity summary */}
      <Card>
        <CardContent className="flex flex-col items-start gap-4 pt-6 sm:flex-row sm:items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={user.avatar ?? undefined}
              alt={user.username || user.email}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">
                {membership?.user?.name || user.username || user.email}
              </h1>
              <Badge variant={user.active ? 'default' : 'secondary'}>
                {user.active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <Mail className="h-3.5 w-3.5" />
              {user.email}
            </p>
            {membership?.designation && (
              <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <Briefcase className="h-3.5 w-3.5" />
                {membership.designation} · {membership.department?.name}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Membership / org details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Membership</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingMembership ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : membership ? (
            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              <DetailRow
                icon={Briefcase}
                label="Designation"
                value={membership.designation}
              />
              <DetailRow
                icon={User}
                label="Department"
                value={membership.department?.name}
              />
              <DetailRow
                icon={User}
                label="Role"
                value={membership.role.name}
              />
              <DetailRow
                icon={User}
                label="Reporting Manager"
                value={membership.reportingManager?.user.name || '—'}
              />
              <DetailRow
                icon={Calendar}
                label="Joined"
                value={format(new Date(membership.joiningDate), 'PPP')}
              />
              <DetailRow
                icon={Calendar}
                label="Member since"
                value={format(new Date(membership.createdAt), 'PPP')}
              />
            </dl>
          ) : (
            <p className="text-muted-foreground text-sm">
              No membership details found.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Personal details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Personal details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            <DetailRow icon={Phone} label="Phone" value={user.phoneNo || '—'} />
            <DetailRow
              icon={MapPin}
              label="Location"
              value={user.location || '—'}
            />
            <DetailRow
              icon={Calendar}
              label="Joined platform"
              value={format(new Date(user.createdAt), 'PPP')}
            />
          </dl>
        </CardContent>
      </Card>
    </div>
  );
};

const DetailRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) => (
  <div>
    <dt className="text-muted-foreground flex items-center gap-1.5 text-xs">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </dt>
    <dd className="text-sm font-medium">{value}</dd>
  </div>
);

const ProfilePageSkeleton = () => (
  <div className="mx-auto w-full max-w-2xl space-y-6 py-6">
    <Card>
      <CardContent className="flex items-center gap-4 pt-6">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="space-y-3 pt-6">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  </div>
);

export default ProfilePage;
