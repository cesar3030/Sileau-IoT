var coap = require('coap');
var request = require('request');
var bl = require('bl')

coap.createServer((req, res) => {
    console.log("hey")
    console.log(req.url.split('/')[1])
    req.pipe(bl(function(err, data) {
        var json = JSON.parse(data)
        console.log(json)
        request.post({
            url:'http://0.0.0.0:9000/api/masters/5aae00322354b97bead92b9c/data', 
            form: {
                pressure: json.pressure,
                temperature: json.temperature,
                humidity: json.humidity
            }
        }, 
        function(err,httpResponse,body){ 
            if(err) console.log(err)
            console.log(body)
            res.setOption("Content-Format", "application/json");
            res.end(body)
        });
    }))

}).listen(function() {
    console.log('CoAP Server Listening on port 5683')
 })

