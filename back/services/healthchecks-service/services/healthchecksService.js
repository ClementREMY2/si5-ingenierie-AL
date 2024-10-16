const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const getAllHealthchecksQuery = `
    SELECT 
        *
    FROM 
        reports
`;


exports.getAllHealthchecks = async () => {
  const result = await pool.query(getAllHealthchecksQuery);
  return result.rows;
};