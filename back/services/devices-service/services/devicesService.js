const { pool } = require('../lib/db');

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