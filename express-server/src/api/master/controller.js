import { success, notFound } from '../../services/response/'
import { Master } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Master.create(body)
    .then((master) => master.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Master.find(query, select, cursor)
    .then((masters) => masters.map((master) => master.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Master.findById(params.id)
    .then(notFound(res))
    .then((master) => master ? master.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Master.findById(params.id)
    .then(notFound(res))
    .then((master) => master ? Object.assign(master, body).save() : null)
    .then((master) => master ? master.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Master.findById(params.id)
    .then(notFound(res))
    .then((master) => master ? master.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const coapRequest = ({ params }, res, next) => {
  Master.findById(params.id)
    .then(notFound(res))
    .then((master) => {
      var payload = {
        activated: params.body.activated
      }

      const req2 = coap.request({
        hostname: master.host,
        pathname: '/encoding',
        method: 'POST',
        option: {"Content-Type": "application/json"},
        query: "accept=application/json"
      })

      req2.write(JSON.stringify(payload));
  
      req2.on('response', function(res3) {
        res3.pipe(process.stdout)
        return master
      })

      req2.end()
      return true
    })
    .then(success(res, 204))
    .catch(next)
