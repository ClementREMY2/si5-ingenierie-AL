const authenticationService = require('../services/authenticationService');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authenticationService.login(email, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};


const register = async (req, res) => {
    try {
        const { email, password, first_name, last_name, phone, role_id } = req.body;
        console.log(req.body);
        const token = await authenticationService.register(email, password, first_name, last_name, phone, role_id);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}


module.exports = {
    login,
    register
};