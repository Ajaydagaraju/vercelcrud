import { Pool } from 'pg';

// Use the environment variables to set up the connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // or POSTGRES_URL_NO_SSL if you are using no SSL
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432, // Assuming you're using the default PostgreSQL port
});

export const query = (text, params) => pool.query(text, params);
