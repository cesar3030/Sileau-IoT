var coap = require('coap');
var request = require('request');
var bl = require('bl')
const PORT = process.env.PORT || 5683
// Local
// const SILO_API_URL = 'http://0.0.0.0:9000/api'
// Prod
const SILO_API_URL = 'https://api-silo.herokuapp.com/api/'
var fanState = 0

coap.createServer((req, res) => {
    console.log("-------  NEW REQUEST  -------")
    console.log("Date:" + new Date())
    console.log("IP: "+req.rsinfo.address)
    console.log(" Method: "+ req.method)
    console.log(" URL: "+ req.url)
    req.pipe(bl(function(err, data){
        var json = JSON.parse(data)
        console.log("-- Request JSON Payload --")
        console.log(json)
        res.end(JSON.stringify({f:fanState}))
        request.post({
            url: SILO_API_URL+'masters/5aae00322354b97bead92b9c/data', 
            form: {
                pressure: json.p,
                temperature: json.t,
                humidity: json.h
            }
        }, 
        function(err,httpResponse,body){ 
            if(err) console.log(err)
            console.log("\n-- Response From "+ SILO_API_URL +" --")
            fanState = JSON.parse(body).activated ? 1 : 0
            console.log(body)
            console.log("\n-- Forwarding JSON Response to Beaglebone --")
           // res2.end(body)
            /console.log("-------  END REQUEST  -------\n\n")
        });
    }))
  
}).listen(PORT, '0.0.0.0', function() {
    console.log('CoAP Server Listening on port 5683')
})
