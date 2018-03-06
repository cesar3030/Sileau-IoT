import { sign } from '../../services/jwt'
import { success } from '../../services/response/'
import { getJSON } from '../../utils/http-request'

export const login = ({ user }, res, next) =>
  sign(user.id)
    .then((token) => ({ token, user: user.view(true) }))
    .then(success(res, 201))
    .catch(next)

export const coapRequest = ({ user }, res, next) => {
  var options = {
    host: 'jsonplaceholder.typicode.com',
    port: 443,
    path: '/posts/1',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  };

  getJSON(options, function(statusCode, result) {
    // I could work with the result html/json here.  I could also just return it
    console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
    res.statusCode = statusCode;
    res.send(result);
  });
  // res.status(200).json({test:'test'})
}
