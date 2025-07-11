const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { comparePassword, createUser } = require('../services/userService');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

async function register(req, res) {
  const { email, password } = req.body;
  try {
    const user = await createUser(email, password);
    res.status(201).json({ message: 'Usuario creado', userId: user.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const valid = await comparePassword(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error interno' });
  }
}

module.exports = { register, login };
