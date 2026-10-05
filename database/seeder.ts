import { drizzle } from 'drizzle-orm/node-postgres';
import { faker } from '@faker-js/faker';
import * as schema from './schema';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  await db.insert(schema.users).values(
    Array.from({ length: 10 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }))
  );
  console.log('Seeding complete');
  process.exit(0);
}

main();
