import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgres://user:user@127.0.0.1:5432/",
});

// pool.on('connect', () => {
//   // Prevent loading native bindings
//   delete require.cache[require.resolve('pg/lib/native')];
// });

export const db = drizzle(pool);

