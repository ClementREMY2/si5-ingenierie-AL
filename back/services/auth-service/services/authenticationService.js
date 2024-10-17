const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const secretKey = process.env.JWT_SECRET_KEY;

const login = async (email, password) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, email: user.email, role_id: user.role_id }, secretKey, { expiresIn: '1h' });

  return token;
};

const register = async (email, password, first_name, last_name, phone, role) => { 
  const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (userCheck.rows.length > 0) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (email, password, first_name, last_name, phone, role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [email, hashedPassword, first_name, last_name, phone, role]
  );
  const newUser = result.rows[0];

  const token = jwt.sign({ id: newUser.id, email: newUser.email, role_id: newUser.role_id }, secretKey, { expiresIn: '1h' });

  return token;
};

module.exports = {
  login,
  register
};