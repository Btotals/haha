const http = require('http')

const port = 8080

http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.end('ok')
}).listen(port, function() { console.log('listen on port', port) })
