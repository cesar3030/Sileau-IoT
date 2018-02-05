import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Articles } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, articles

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  articles = await Articles.create({})
})

test('POST /articles 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, title: 'test', text: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.text).toEqual('test')
})

test('POST /articles 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /articles 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /articles 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /articles/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${articles.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(articles.id)
})

test('GET /articles/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /articles/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${articles.id}`)
    .send({ access_token: adminSession, title: 'test', text: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(articles.id)
  expect(body.title).toEqual('test')
  expect(body.text).toEqual('test')
})

test('PUT /articles/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${articles.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /articles/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${articles.id}`)
  expect(status).toBe(401)
})

test('PUT /articles/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, title: 'test', text: 'test' })
  expect(status).toBe(404)
})

test('DELETE /articles/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${articles.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /articles/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${articles.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /articles/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${articles.id}`)
  expect(status).toBe(401)
})

test('DELETE /articles/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
