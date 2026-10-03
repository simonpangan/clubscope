import Link from 'next/link';
import { db } from '@/database';
import DeleteUserForm from '@/app/_components/delete-user-form';

const btn = 'rounded-md px-3 py-2 text-sm font-medium text-white transition-colors';

export default async function Home() {
  const users = await db.query.users.findMany({
    orderBy: (users, { asc }) => [asc(users.id)],
  });

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-8 text-zinc-900 dark:text-zinc-100">
      <h1 className="text-2xl font-semibold">Users</h1>

      <section className="space-y-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="text-sm font-medium text-zinc-500">Add user</h2>
        <Link href="/users/create" className={`${btn} bg-blue-600 hover:bg-blue-500`}>
          Add user
        </Link>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-zinc-500">All users ({users.length})</h2>

        {users.length === 0 && <p className="text-sm text-zinc-500">No users yet.</p>}

        <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {users.map((u) => (
            <li key={u.id} className="flex items-center gap-2 p-3">
              <div className="flex min-w-0 flex-1 gap-2 text-sm">
                <span className="flex-1 truncate font-medium">{u.name}</span>
                <span className="flex-1 truncate text-zinc-500">{u.email}</span>
              </div>
              <Link href={`/users/${u.id}/edit`} className={`${btn} bg-blue-600 hover:bg-blue-500`}>
                Edit
              </Link>
              <DeleteUserForm id={u.id} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
