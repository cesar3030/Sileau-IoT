import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, coapRequest, newData } from './controller'
import { schema } from './model'
export Master, { schema } from './model'

const router = new Router()
const { host, imei, humidity, pressure, temperature } = schema.tree

/**
 * @api {post} /masters Create master
 * @apiName CreateMaster
 * @apiGroup Master
 * @apiParam host Master's host.
 * @apiParam imei Master's imei.
 * @apiSuccess {Object} master Master's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Master not found.
 */
router.post('/',
  body({ host, imei }),
  create)

/**
 * @api {post} /masters/:id/request Send a caop request to master
 * @apiName SendCoAPRequestToMaster
 * @apiGroup Master
 * @apiParam {Boolean} activated true||false.
 * @apiSuccess {Object} master Master's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Master not found.
 */
router.post('/:id/request',
  coapRequest)

/**
 * @api {post} /masters/:id/data Add Temperature, Pressure and Humidity data to the model
 * @apiName SendCoAPRequestToMaster
 * @apiGroup Master
 * @apiParam {Boolean} activated true||false.
 * @apiSuccess {Object} master Master's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Master not found.
 */
router.post('/:id/data',
  body({temperature, pressure, humidity}),
  newData)

/**
 * @api {get} /masters Retrieve masters
 * @apiName RetrieveMasters
 * @apiGroup Master
 * @apiUse listParams
 * @apiSuccess {Object[]} masters List of masters.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /masters/:id Retrieve master
 * @apiName RetrieveMaster
 * @apiGroup Master
 * @apiSuccess {Object} master Master's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Master not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /masters/:id Update master
 * @apiName UpdateMaster
 * @apiGroup Master
 * @apiParam host Master's host.
 * @apiParam imei Master's imei.
 * @apiSuccess {Object} master Master's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Master not found.
 */
router.put('/:id',
  body({ host, imei }),
  update)

/**
 * @api {delete} /masters/:id Delete master
 * @apiName DeleteMaster
 * @apiGroup Master
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Master not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
