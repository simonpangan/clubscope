'use server';

import {z} from 'zod';
import {db} from '@/database';
import {users} from '@/database/schema';
import {eq} from 'drizzle-orm';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

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

const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z.email('Invalid email address'),
});

const updateUserSchema = userSchema.extend({
  id: z.coerce.number().int().positive(),
});

export async function createUser(
  _prevState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  const values = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
  };

  const result = userSchema.safeParse(values);
  if (!result.success) {
    return { values, errors: z.flattenError(result.error).fieldErrors };
  }

  try {
    await db.insert(users).values({ ...result.data, age: 12 });
  } catch {
    return { values, message: 'Could not create user. Please try again.' };
  }

  revalidatePath('/users');
  redirect('/users');
}

export async function updateUser(
  _prevState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  const values = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
  };

  const result = updateUserSchema.safeParse({
    id: formData.get('id'),
    ...values,
  });
  if (!result.success) {
    return { values, errors: z.flattenError(result.error).fieldErrors };
  }

  const { id, ...data } = result.data;

  try {
    await db.update(users).set(data).where(eq(users.id, id));
  } catch {
    return { values, message: 'Could not update user. Please try again.' };
  }

  revalidatePath('/users');
  redirect('/users');
}

export async function deleteUser(formData: FormData) {
  const id = Number(formData.get('id'));
  await db.delete(users).where(eq(users.id, id));

  revalidatePath('/users');
}
