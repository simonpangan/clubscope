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
    <main className="mx-auto w-full max-w-md space-y-6 px-6 py-12">
      <EditUserForm user={user} />
    </main>
  );
}
