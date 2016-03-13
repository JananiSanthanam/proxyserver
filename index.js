var http = require('http')
var request = require('request')
var fs = require('fs')
var argv = require('yargs').argv
var logStream = argv.logfile ? fs.createWriteStream(argv.logfile) 
:process.stdout

var localhost = '127.0.0.1'
var port = argv.port || (host === localhost ? 8000 :80)
var host = argv.host || localhost
var scheme = 'http://'
var destinationUrl = scheme + host + ':' + port

echoServer =http.createServer((req,res) => {
	logStream.write('echoServer \n')
	for(var header in req.headers){
		res.setHeader(header,req.headers[header])
	}
	logStream.write(JSON.stringify(req.headers) + '\n')
	req.pipe(res)

	})
echoServer.listen(8000)
logStream.write('echoserver listening to 8000 \n')

proxyserver =http.createServer((req,res) => {
	logStream.write('proxyserver \n')
	logStream.write(JSON.stringify(req.headers) + '\n')
	var url = destinationUrl
	if(req.headers['x-destination-url']){
	 url = 'http://' + req.headers['x-destination-url'] 
}
	var options ={
		url: url + req.url
	}
	req.pipe(request(options)).pipe(res)
	
	})
proxyserver.listen(9000)
logStream.write('proxyserver listening to 9000\n')