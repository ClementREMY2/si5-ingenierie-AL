const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

exports.getDoctorById = async (id) => {
    const doctor = await pool.query(
        `
        SELECT 
            u.id AS doctor_id,
            u.last_name,
            u.first_name,
            u.phone,
            u.email,
            d.specialty
        FROM 
            users u
        LEFT JOIN doctors d ON d.user_id = u.id
        WHERE u.id = $1;
        `,
        [id]
    );
    if(doctor.rows.length === 0) {
        return null;
    }
    const patients = await pool.query(
        `
        SELECT 
            u.id AS patient_id,
            u.last_name,
            u.first_name,
            u.phone,
            u.email
        FROM 
            users u
        JOIN patients p ON p.user_id = u.id
        WHERE p.doctor_id = $1;
        `,
        [id]
    );
    doctor.rows[0].patients = patients.rows;
    return doctor.rows[0];
    }
