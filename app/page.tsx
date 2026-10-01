import { db } from '@/database';
import UserForm from '@/app/_components/user-form';
import { updateUser } from './actions';
import DeleteUserForm from '@/app/_components/delete-user-form';

const input =
  'rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-400';
const btn = 'rounded-md px-3 py-2 text-sm font-medium text-white transition-colors';

export default async function Home() {
  const users = await db.query.users.findMany({
    limit: 20,
  });

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-8 text-zinc-900 dark:text-zinc-100">
      <h1 className="text-2xl font-semibold">Users</h1>

      <section className="space-y-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="text-sm font-medium text-zinc-500">Add user</h2>
        <UserForm />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-zinc-500">All users ({users.length})</h2>

        {users.length === 0 && <p className="text-sm text-zinc-500">No users yet.</p>}

        <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {users.map((u) => (
            <li key={u.id} className="flex items-center gap-2 p-3">
              <form action={updateUser} className="flex flex-1 gap-2">
                <input type="hidden" name="id" value={u.id} />
                <input name="name" defaultValue={u.name} required className={`${input} flex-1`} />
                <input
                  name="email"
                  type="email"
                  defaultValue={u.email}
                  required
                  className={`${input} flex-1`}
                />
                <button type="submit" className={`${btn} bg-blue-600 hover:bg-blue-500`}>
                  Update
                </button>
              </form>
              <DeleteUserForm id={u.id} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
