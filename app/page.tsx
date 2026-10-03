import Link from 'next/link';
import {ArrowRight, Database, ExternalLink, Layers, Mail, Palette, ShieldCheck,} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {buttonVariants} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';

const GITHUB_URL = 'https://github.com/simonpangan';
const REPO_URL = 'https://github.com/simonpangan/clubscope';
const EMAIL = 'simonjoseph.pangan@gmail.com';

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

const projects = [
  {
    name: 'Interview Todo App',
    description: 'Full-stack CRUD app with validation, a typed database layer, and a polished UI.',
    stack: ['Next.js', 'Drizzle', 'Postgres', 'shadcn/ui'],
    href: REPO_URL,
  },
  {
    name: 'Project two',
    description: 'One sentence on what it does and why it matters.',
    stack: ['Laravel', 'MySQL'],
    href: GITHUB_URL,
  },
  {
    name: 'Project three',
    description: 'Pick something that shows range, like a different domain or an AI feature.',
    stack: ['TypeScript', 'Node'],
    href: GITHUB_URL,
  },
];

const skills = [
  { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { group: 'Backend', items: ['Server Actions', 'Laravel', 'REST APIs', 'Zod'] },
  { group: 'Database', items: ['PostgreSQL', 'Drizzle ORM', 'Migrations'] },
  { group: 'Tooling', items: ['pnpm', 'Git', 'ESLint', 'Vercel'] },
];

const principles = [
  'Validate on the server first, then make the UI friendly.',
  'Keep one consistent convention across the whole codebase.',
  'Write down why, not just what.',
];
// --------------------------------

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

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
          <Badge variant="secondary">Available for new opportunities</Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Hi, I&apos;m Simon Joseph.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A full-stack developer who builds clean, well-structured web apps with Next.js and
            Laravel, from the database schema to the last pixel of the UI.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/users" className={buttonVariants({ size: 'lg' })}>
              Open the app
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
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-16 px-6 py-16">
        {/* Built for this interview */}
        <section className="space-y-6">
          <SectionHeading
            title="Built for this interview"
            subtitle="What I made and the decisions behind it."
          />
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

        {/* Projects */}
        <section className="space-y-6">
          <SectionHeading title="Selected work" />
          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((p) => (
              <Card key={p.name} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-base">{p.name}</CardTitle>
                  <CardDescription>{p.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <Badge key={s} variant="outline">
                        {s}
                      </Badge>
                    ))}
                  </div>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                  >
                    View project
                    <ExternalLink className="size-3.5" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-6">
          <SectionHeading title="Skills" />
          <div className="grid gap-6 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.group} className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{s.group}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.items.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How I work */}
        <section className="space-y-6">
          <SectionHeading title="How I work" />
          <ul className="space-y-3">
            {principles.map((p, i) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {i + 1}
                </span>
                <span className="pt-0.5">{p}</span>
              </li>
            ))}
          </ul>
        </section>

        <Separator />

        {/* Contact */}
        <section className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Let&apos;s talk</h2>
          <p className="text-sm text-muted-foreground">
            Happy to walk through any part of the code or go deeper on a decision.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${EMAIL}`} className={buttonVariants()}>
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
        </section>
      </div>
    </main>
  );
}