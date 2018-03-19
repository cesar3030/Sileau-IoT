var coap = require('coap');
var request = require('request');
var bl = require('bl')
const PORT = process.env.PORT || 5683
// Local
// const SILO_API_URL = 'http://0.0.0.0:9000/api'
// Prod
const SILO_API_URL = 'https://api-silo.herokuapp.com/api'

coap.createServer((req, res) => {
    console.log("-------  NEW REQUEST  -------")
    console.log(" From: "+ req.rsinfo.address)
    console.log(" Method: "+ req.method)
    console.log(" URL: "+ req.url)
    req.pipe(bl(function(err, data) {
        var json = JSON.parse(data)
        console.log("-- Request JSON Payload --")
        console.log(json)
        console.log("\n-- Forwarding Payload to "+ SILO_API_URL +" --")
        request.post({
            url: SILO_API_URL+'/masters/5aae00322354b97bead92b9c/data', 
            form: {
                pressure: json.pressure,
                temperature: json.temperature,
                humidity: json.humidity
            }
        }, 
        function(err,httpResponse,body){ 
            if(err) console.log(err)
            console.log("\n-- Response From "+ SILO_API_URL +" --")
            console.log(body)
            console.log("\n-- Forwarding JSON Response to Beaglebone --")
            res.setOption("Content-Format", "application/json");
            res.end(body)
            console.log("-------  END REQUEST  -------\n\n")
        });
    }))

}).listen(PORT, function() {
    console.log('CoAP Server Listening on port 5683')
 })

