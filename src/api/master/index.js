import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Master, { schema } from './model'

const router = new Router()
const { imei, host } = schema.tree

/**
 * @api {post} /masters Create master
 * @apiName CreateMaster
 * @apiGroup Master
 * @apiParam imei Master's imei.
 * @apiParam host Master's host.
 * @apiSuccess {Object} master Master's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Master not found.
 */
router.post('/',
  body({ imei, host }),
  create)

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
 * @apiParam imei Master's imei.
 * @apiParam host Master's host.
 * @apiSuccess {Object} master Master's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Master not found.
 */
router.put('/:id',
  body({ imei, host }),
  update)

/**
 * @api {delete} /masters/:id Delete master
 * @apiName DeleteMaster
 * @apiGroup Master
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Master not found.
 */
router.delete('/:id',
  destroy)

export default router
