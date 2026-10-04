import Link from 'next/link';
import { ArrowRight, ExternalLink, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';

const GITHUB_URL = 'https://github.com/simonpangan';
const REPO_URL = 'https://github.com/simonpangan/clubscope';
const EMAIL = 'simonjoseph.pangan@gmail.com';

const stack = [
  'Next.js',
  'TypeScript',
  'PostgreSQL',
  'Drizzle ORM',
  'Zod',
  'shadcn/ui',
  'Tailwind CSS',
  'GitHub Actions',
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[size:48px_48px] opacity-60"
        />
        <div className="mx-auto max-w-4xl space-y-6 px-6 py-24 text-center">
          <Badge variant="secondary">CRUD app demo</Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            A simple user CRUD, built end to end.
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            A full-stack demo built with Next.js, TypeScript, and PostgreSQL. Create, read, update,
            and delete users with server-side validation and a typed database layer.
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

      <footer className="mx-auto max-w-4xl space-y-4 px-6 py-12 text-center">
        <p className="text-muted-foreground text-sm">
          Built by <span className="text-foreground font-medium">Simon Pangan</span>. Happy to walk
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
    </main>
  );
}
