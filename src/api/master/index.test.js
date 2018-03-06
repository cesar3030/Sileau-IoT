import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Master } from '.'

const app = () => express(apiRoot, routes)

let master

beforeEach(async () => {
  master = await Master.create({})
})

test('POST /masters 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ imei: 'test', host: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.imei).toEqual('test')
  expect(body.host).toEqual('test')
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
    .send({ imei: 'test', host: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(master.id)
  expect(body.imei).toEqual('test')
  expect(body.host).toEqual('test')
})

test('PUT /masters/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ imei: 'test', host: 'test' })
  expect(status).toBe(404)
})

test('DELETE /masters/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${master.id}`)
  expect(status).toBe(204)
})

test('DELETE /masters/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
