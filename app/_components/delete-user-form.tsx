// app/_components/delete-user-form.tsx

'use client';

import { deleteUser } from '@/app/actions';

export default function DeleteUserForm({ id }: { id: number }) {
  return (
    <form
      action={deleteUser}
      onSubmit={(e) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
        className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
      >
        Delete
      </button>
    </form>
  );
}
