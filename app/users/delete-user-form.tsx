'use client';

import { Trash2 } from 'lucide-react';
import { deleteUser } from '@/actions/user-actions';
import { Button } from '@/components/ui/button';

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

      <Button
        type="submit"
        variant="outline"
        size="icon-sm"
        aria-label="Delete user"
        title="Delete user"
        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 />
      </Button>
    </form>
  );
}
