import { sign } from '../../services/jwt'
import { success } from '../../services/response/'
// import { getJSON } from '../../utils/http-request'
var coap = require('coap')
const bl   = require('bl')

export const login = ({ user }, res, next) =>
  sign(user.id)
    .then((token) => ({ token, user: user.view(true) }))
    .then(success(res, 201))
    .catch(next)

export const coapGetRequest = ({ user }, res, next) => {
  coap.request({
    hostname: 'coap.lesperance.cloud',
    pathname: '/encoding',
    option: {"Content-Type": "application/json"},
    query: "accept=application/json"
  })
  .on('response', function(res2) {
    console.log('response code', res2.code)
    if (res2.code !== '2.05')
      console.log('Erreur!')

    res2.pipe(bl(function(err, data) {
      var json = JSON.parse(data)
      res.status(200).json(json);
    }))
  })
  .end()
}

export const coapPostRequest = ({ user }, res, next) => {
  var payload = {
    title: 'this is a test payload_POST',
    body: 'containing nothing useful_POST',
    accept: 'application/json_POST'
  }

  const req2 = coap.request({
    hostname: 'coap.lesperance.cloud',
    pathname: '/encoding',
    method: 'POST',
    option: {"Content-Type": "application/json"},
    query: "accept=application/json"
  })
  
  req2.write(JSON.stringify(payload));
  
  req2.on('response', function(res3) {
    res3.pipe(process.stdout)
    res.status(200).json({test: res3.payload.toString('utf8')})
  })

  req2.end()
}

export const coapPutRequest = ({ user }, res, next) => {
  var payload = {
    title: 'this is a test payload_PUT',
    body: 'containing nothing useful_PUT',
    accept: 'application/json_PUT'
  }

  const req2 = coap.request({
    hostname: 'coap.lesperance.cloud',
    pathname: '/encoding',
    method: 'PUT',
    option: {"Content-Type": "application/json"},
    query: "accept=application/json"
  })
  
  req2.write(JSON.stringify(payload));
  
  req2.on('response', function(res3) {
    res3.pipe(process.stdout)
    res.status(200).json({test: res3.payload.toString('utf8')})
  })

  req2.end()
}