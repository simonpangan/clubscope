import { seed } from 'drizzle-seed';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  await seed(db, { users: schema.users }).refine((f) => ({
    users: {
      count: 10,
      columns: {
        name: f.fullName(),
        email: f.email(),
      },
    },
  }));
  console.log('Seeding complete');
  process.exit(0);
}

main();
