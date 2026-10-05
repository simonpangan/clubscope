'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { createUser } from '@/actions/user-actions';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreateUser() {
  const [state, formAction, isPending] = useActionState(createUser, {});

  return (
    <div className="mx-auto w-full max-w-md space-y-6 px-6 py-12">
      <Link
        href="/users"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to users
      </Link>

      <form action={formAction}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add user</CardTitle>
            <CardDescription>Enter the details of the person you want to add.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Jane Doe"
                defaultValue={state.values?.name ?? ''}
                aria-invalid={!!state.errors?.name}
                aria-describedby={state.errors?.name ? 'name-error' : undefined}
              />
              {state.errors?.name && (
                <p id="name-error" className="text-destructive text-sm">
                  {state.errors.name[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                defaultValue={state.values?.email ?? ''}
                aria-invalid={!!state.errors?.email}
                aria-describedby={state.errors?.email ? 'email-error' : undefined}
              />
              {state.errors?.email && (
                <p id="email-error" className="text-destructive text-sm">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            {state.message && (
              <p role="status" className="text-muted-foreground text-sm">
                {state.message}
              </p>
            )}
          </CardContent>

          <CardFooter className="justify-end gap-2">
            <Link href="/" className={buttonVariants({ variant: 'outline' })}>
              Cancel
            </Link>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="animate-spin" />}
              {isPending ? 'Adding...' : 'Add user'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
