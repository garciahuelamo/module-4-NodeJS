const request = require('supertest');
const app = require('../../src/app');

describe('Auth API', () => {
  it('Debería registrar un usuario', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@test.com', password: '123456' });
    expect(res.statusCode).toBe(201);
  });

  it('Debería iniciar sesión y devolver un token', async () => {
    await request(app).post('/api/auth/register').send({ email: 'test2@test.com', password: '123456' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test2@test.com', password: '123456' });
    expect(res.body.token).toBeDefined();
  });
});
