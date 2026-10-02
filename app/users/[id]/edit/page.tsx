import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db } from '@/database';
import { users } from '@/database/schema';
import EditUserForm from '@/app/users/[id]/edit/edit-user-form';

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const userId = Number(id);
  if (!Number.isInteger(userId)) {
    notFound();
  }

  const [user] = await db.select().from(users).where(eq(users.id, userId));

  if (!user) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-xl font-semibold">Edit user</h1>
      <EditUserForm user={user} />
    </main>
  );
}
