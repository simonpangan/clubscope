import Link from 'next/link';
import {ArrowRight, Database, ExternalLink, Layers, Mail, Palette, ShieldCheck,} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {buttonVariants} from '@/components/ui/button';
import {Card, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

const GITHUB_URL = 'https://github.com/simonpangan';
const REPO_URL = 'https://github.com/simonpangan/clubscope';
const EMAIL = 'simonjoseph.pangan@gmail.com';

const stack = ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Zod', 'shadcn/ui', 'Tailwind CSS'];

const highlights = [
  {
    icon: ShieldCheck,
    title: 'Validated on the server',
    text: 'Server Actions with Zod schemas and inline field errors, so bad data never reaches the database.',
  },
  {
    icon: Database,
    title: 'Typed all the way down',
    text: 'Drizzle ORM with Postgres. The schema is the single source of truth for types.',
  },
  {
    icon: Palette,
    title: 'Consistent, accessible UI',
    text: 'shadcn/ui components, theme tokens, dark mode, and properly labelled forms.',
  },
  {
    icon: Layers,
    title: 'Clear structure',
    text: 'Actions, database, and components are separated with one convention across the project.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        />
        <div className="mx-auto max-w-4xl space-y-6 px-6 py-24 text-center">
          <Badge variant="secondary">CRUD app demo</Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            User management, built end to end.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A full-stack demo built with Next.js, TypeScript, and PostgreSQL. Create, read, update,
            and delete users with server-side validation and a fully typed database layer.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/users" className={buttonVariants({ size: 'lg' })}>
              Try the demo
              <ArrowRight />
            </Link>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
            >
              View source
              <ExternalLink />
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {stack.map((s) => (
              <Badge key={s} variant="outline">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-16 px-6 py-16">
        {/* Highlights */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Under the hood</h2>
            <p className="text-sm text-muted-foreground">The decisions behind the demo.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, title, text }) => (
              <Card key={title}>
                <CardHeader>
                  <div className="mb-2 flex size-9 items-center justify-center rounded-md bg-muted">
                    <Icon className="size-4" />
                  </div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription>{text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="space-y-4 border-t pt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Built by <span className="font-medium text-foreground">Simon Joseph</span>. Happy to walk
            through any part of the code.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${EMAIL}`} className={buttonVariants({ variant: 'outline' })}>
              <Mail />
              Email me
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: 'outline' })}
            >
              GitHub
              <ExternalLink />
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}