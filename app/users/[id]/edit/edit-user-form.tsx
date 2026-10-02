'use client';

import { useActionState } from 'react';
import { updateUser } from '@/actions/user-actions';
import type { User } from '@/types';

const input =
  'rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-400';
const btn = 'rounded-md px-3 py-2 text-sm font-medium text-white transition-colors';

export default function EditUserForm({ user }: { user: User }) {
  const [state, formAction, isPending] = useActionState(updateUser, {});

  return (
    <form
      action={formAction}
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
          defaultValue={state.values?.name ?? user.name}
          className={`${input} w-full`}
          aria-invalid={!!state.errors?.name}
        />
        {state.errors?.name && <p className="text-sm text-red-500">{state.errors.name[0]}</p>}
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium text-zinc-500">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={state.values?.email ?? user.email}
          className={`${input} w-full`}
          aria-invalid={!!state.errors?.email}
        />
        {state.errors?.email && <p className="text-sm text-red-500">{state.errors.email[0]}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={`${btn} bg-blue-600 hover:bg-blue-500 disabled:opacity-50`}
      >
        {isPending ? 'Saving...' : 'Save changes'}
      </button>

      {state.message && <p className="text-sm text-red-500">{state.message}</p>}
    </form>
  );
}
