const bcrypt = require('bcrypt');
const User = require('../models/user');

const saltRounds = 10;

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

async function createUser(email, password) {
  const hashed = await hashPassword(password);
  return await User.create({ email, password: hashed });
}

module.exports = { hashPassword, comparePassword, createUser };
