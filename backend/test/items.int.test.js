process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../src/app');

describe('MyItems CRUD (integration)', () => {
  let created;

  test('POST /api/items crea item', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ title: 'Primero', description: 'Desc', tags: ['a', 'b'] })
      .expect(201);

    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe('Primero');
    expect(Array.isArray(res.body.tags)).toBe(true);
    created = res.body;
  });

  test('GET /api/items lista con paginación', async () => {
    const res = await request(app)
      .get('/api/items?page=1&pageSize=5')
      .expect(200);

    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('total');
    expect(res.body.page).toBe(1);
  });

  test('GET /api/items?search= filtra por title/tags', async () => {
    const res = await request(app)
      .get('/api/items?search=Primero')
      .expect(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test('GET /api/items/:id obtiene detalle', async () => {
    const res = await request(app)
      .get(`/api/items/${created.id}`)
      .expect(200);
    expect(res.body.id).toBe(created.id);
  });

  test('PUT /api/items/:id actualiza', async () => {
    const res = await request(app)
      .put(`/api/items/${created.id}`)
      .send({ title: 'Actualizado', tags: ['x'] })
      .expect(200);
    expect(res.body.title).toBe('Actualizado');
    expect(res.body.tags).toEqual(['x']);
  });

  test('DELETE /api/items/:id borra', async () => {
    await request(app).delete(`/api/items/${created.id}`).expect(204);
    await request(app).get(`/api/items/${created.id}`).expect(404);
  });

  test('GET /api/health devuelve OK con DB', async () => {
    const res = await request(app).get('/api/health').expect(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.db).toBe('connected');
  });
});
