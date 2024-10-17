require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

module.exports = {
    name: 'auth',
    schema: {
        $id: 'http://express-gateway.io/schemas/policies/example-policy.json',
        type: 'object',
        properties: {
            roles: {
                type: 'array',
                items: {
                    type: 'integer'
                }
            }
        }
    },
    policy: (actionParams) => {
        return async (req, res, next) => {
            console.log(actionParams.roles);
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).send('Unauthorized');
            }

            const token = authHeader.split(' ')[1];
            let decoded;
            try {
                decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            } catch (err) {
                console.log(err);
                return res.status(401).send('Unauthorized');
            }

            try {
                const result = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.id]);
                if (result.rows.length === 0) {
                    return res.status(401).send('Unauthorized');
                }

                const user = result.rows[0];

                if (user.role_id !== decoded.role_id) {
                    return res.status(403).send('Forbidden');
                }

                if (!actionParams.roles.includes(decoded.role_id)) {
                    return res.status(403).send('Forbidden');
                }

                next();
            } catch (err) {
                console.log(err);
                return res.status(500).send('Internal Server Error');
            }
        };
    }
};