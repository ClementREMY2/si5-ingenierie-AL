const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const getAllDevicesQuery = `
    SELECT 
       *
    FROM 
        devices
`;


exports.getAllDevices = async () => {
  const result = await pool.query(getAllDevicesQuery);
  return result.rows;
};