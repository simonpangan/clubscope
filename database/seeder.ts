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
        age: f.int({ minValue: 18, maxValue: 65 }),
        role: f.valuesFromArray({ values: ['admin', 'user'] }),
      },
    },
  }));
  console.log('Seeding complete');
  process.exit(0);
}

main();
