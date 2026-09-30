'use server';

import { z } from 'zod';
import { db } from '@/database';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

type UserFormState = {
  message?: string;
  values?: {
    name: string;
    email: string;
  };
  errors?: {
    name?: string[];
    email?: string[];
  };
};

const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email address'),
});

export async function createUser(
  _prevState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  const values = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
  };

  const result = createUserSchema.safeParse(values);
  if (!result.success) {
    return {
      values,
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  try {
    await db.insert(users).values({ ...result.data, age: 12 });
  } catch {
    return {
      values,
      message: 'Could not create user. Please try again.',
    };
  }

  revalidatePath('/');

  return { message: 'User created.' };
}

export async function updateUser(formData: FormData) {
  const id = Number(formData.get('id'));
  await db
    .update(users)
    .set({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    })
    .where(eq(users.id, id));

  revalidatePath('/');
}

export async function deleteUser(formData: FormData) {
  const id = Number(formData.get('id'));
  await db.delete(users).where(eq(users.id, id));

  revalidatePath('/');
}
