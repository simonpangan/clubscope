import Link from 'next/link';
import {ArrowLeft, Pencil, Plus, Users} from 'lucide-react';
import {db} from '@/database';
import DeleteUserForm from './delete-user-form';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';
import {buttonVariants} from '@/components/ui/button';
import {Card, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table';

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export default async function UsersPage() {
  const users = await db.query.users.findMany({
    orderBy: (users, { asc }) => [asc(users.id)],
  });

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to home
      </Link>

      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">Users</h1>
          <p className="text-muted-foreground text-sm">
            Manage the people who have access to your app.
          </p>
        </div>
        <Link href="/users/create" className={buttonVariants()}>
          <Plus />
          Add user
        </Link>
      </div>

      <Card className="gap-0 overflow-hidden py-0">
        <CardHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
          <CardTitle className="text-base">All users</CardTitle>
          <Badge variant="secondary">{users.length}</Badge>
        </CardHeader>

        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="pl-6">User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="pr-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={3} className="h-48">
                  <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <div className="bg-muted rounded-full p-3">
                      <Users className="text-muted-foreground size-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">No users yet</p>
                      <p className="text-muted-foreground text-sm">
                        Get started by adding your first user.
                      </p>
                    </div>
                    <Link
                      href="/users/create"
                      className={buttonVariants({ variant: 'outline', size: 'sm' })}
                    >
                      <Plus />
                      Add user
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="py-3 pl-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="text-xs font-medium">
                        {getInitials(u.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{u.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{u.email}</TableCell>
                <TableCell className="pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/users/${u.id}/edit`}
                      className={buttonVariants({ variant: 'outline', size: 'sm' })}
                    >
                      <Pencil />
                      Edit
                    </Link>
                    <DeleteUserForm id={u.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </main>
  );
}