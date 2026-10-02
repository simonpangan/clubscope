'use client';

import { createUser } from '@/actions/user-actions';
import { useActionState } from 'react';

const input =
  'rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-400';
const btn = 'rounded-md px-3 py-2 text-sm font-medium text-white transition-colors';

export default function UserForm() {
  const [state, formAction, isPending] = useActionState(createUser, {});

  return (
    <form action={formAction} className="flex gap-2">
      <div className="flex-1">
        <input
          name="name"
          placeholder="Name"
          defaultValue={state.values?.name ?? ''}
          className={`${input} w-full`}
          aria-invalid={!!state.errors?.name}
        />
        {state.errors?.name && <p className="text-sm text-red-500">{state.errors.name[0]}</p>}
      </div>
      <div className="flex-1">
        <input
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={state.values?.email ?? ''}
          className={`${input} w-full`}
          aria-invalid={!!state.errors?.email}
        />
        {state?.errors?.email && <p className="text-sm text-red-500">{state.errors.email[0]}</p>}
      </div>
      <button type="submit" disabled={isPending} className={btn}>
        {isPending ? 'Adding...' : 'Add'}
      </button>
      {state.message && <p className="text-sm">{state.message}</p>}
    </form>
  );
}
