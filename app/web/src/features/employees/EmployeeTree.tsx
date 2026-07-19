import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Avatar } from '../members/components/MemberBandges';
import { useEmployee } from '@org/core';
import { useParams } from 'react-router';

export type OrgTreeNode = {
  id: string;
  managerId: string | null;
  user: { name: string };
  role: { name: string } | null;
  department: { name: string } | null;
  designation: string | null;
  children: OrgTreeNode[];
};

export function EmployeeTree() {
  const { orgId } = useParams();
  const { employeeTree, isLoadingEmployeeTree: isLoading } = useEmployee({
    orgId,
  });
  if (isLoading) {
    return (
      <div className="space-y-3 p-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3"
            style={{ paddingLeft: (idx % 3) * 24 }}
          >
            <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (employeeTree?.data.length === 0) {
    return (
      <div className="text-muted-foreground py-10 text-center text-sm">
        No reporting structure to display yet.
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-261px)]">
      <div className="border-border rounded-md border p-3">
        {employeeTree?.data.map((node, i) => (
          <TreeNode
            key={node.id}
            node={node}
            depth={0}
            isLast={i === employeeTree.data.length - 1}
          />
        ))}
      </div>
    </ScrollArea>
  );
}

function TreeNode({
  node,
  depth,
  isLast,
}: {
  node: OrgTreeNode;
  depth: number;
  isLast: boolean;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children.length > 0;

  return (
    <div className="relative">
      <div
        className="hover:bg-muted/50 group/node flex items-center gap-2 rounded-md py-1.5 pr-2"
        style={{ paddingLeft: depth * 28 + 4 }}
      >
        {/* connector line for nested nodes */}
        {depth > 0 && (
          <span
            className="border-border absolute top-0 bottom-0 border-l"
            style={{ left: (depth - 1) * 28 + 18 }}
            aria-hidden
          />
        )}

        {hasChildren ? (
          <Button
            variant="ghost"
            size="icon-sm"
            className="h-5 w-5 shrink-0"
            onClick={() => setExpanded((e) => !e)}
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </Button>
        ) : (
          <span className="w-5 shrink-0" />
        )}

        <Avatar name={node.user.name ?? 'User'} index={depth} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm leading-tight font-medium">
              {node.user.name}
            </p>
            {node.role && <Badge variant="secondary">{node.role.name}</Badge>}
          </div>
          <p className="text-muted-foreground truncate text-[11px]">
            {node.designation || node.department?.name || '—'}
          </p>
        </div>

        {hasChildren && (
          <span className="text-muted-foreground text-[11px]">
            {node.children.length} report{node.children.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {hasChildren && expanded && (
        <div>
          {node.children.map((child, i) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              isLast={i === node.children.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
