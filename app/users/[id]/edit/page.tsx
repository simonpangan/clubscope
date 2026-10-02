import Link from 'next/link';
import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db } from '@/database';
import { users } from '@/database/schema';
import { updateUser } from '@/actions/user-actions';

const input =
  'rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-400';
const btn = 'rounded-md px-3 py-2 text-sm font-medium text-white transition-colors';

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const user = await db.query.users.findFirst({
    where: eq(users.id, Number(id)),
  });

  if (!user) notFound();

  return (
    <main className="mx-auto max-w-xl space-y-6 p-8 text-zinc-900 dark:text-zinc-100">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit user</h1>
        <Link href="/" className="text-sm text-zinc-500 hover:underline">
          ← Back
        </Link>
      </div>

      <form
        action={updateUser}
        className="space-y-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
      >
        <input type="hidden" name="id" value={user.id} />

        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-zinc-500">
            Name
          </label>
          <input
            id="name"
            name="name"
            defaultValue={user.name}
            required
            className={`${input} w-full`}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-zinc-500">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={user.email}
            required
            className={`${input} w-full`}
          />
        </div>

        <button type="submit" className={`${btn} bg-blue-600 hover:bg-blue-500`}>
          Save changes
        </button>
      </form>
    </main>
  );
}
