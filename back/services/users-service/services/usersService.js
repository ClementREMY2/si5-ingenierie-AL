const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const getAllUsersQuery = `
    SELECT 
        u.id AS user_id,
        u.username,
        u.last_name,
        u.first_name,
        u.contact,
        r.name AS role

    FROM 
        users u
    LEFT JOIN role r ON u.role_id = r.id
    ORDER BY u.id;
`;


exports.getAllUsers = async () => {
  const result = await pool.query(getAllUsersQuery);
  return result.rows;
};