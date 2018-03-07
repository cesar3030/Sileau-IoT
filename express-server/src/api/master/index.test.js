import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Master } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, master

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  master = await Master.create({})
})

test('POST /masters 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ host: 'test', imei: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.host).toEqual('test')
  expect(body.imei).toEqual('test')
})

test('GET /masters 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /masters/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${master.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(master.id)
})

test('GET /masters/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /masters/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${master.id}`)
    .send({ host: 'test', imei: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(master.id)
  expect(body.host).toEqual('test')
  expect(body.imei).toEqual('test')
})

test('PUT /masters/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ host: 'test', imei: 'test' })
  expect(status).toBe(404)
})

test('DELETE /masters/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${master.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /masters/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${master.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /masters/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${master.id}`)
  expect(status).toBe(401)
})

test('DELETE /masters/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
