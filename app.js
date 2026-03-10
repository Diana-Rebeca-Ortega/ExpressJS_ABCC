const http = require('http');
const server = http.createServer();

function servidor(req, res){
    res.writeHead(200,{'content-type':'text/plain'});
    res.write('Magia maia con NODEJS');
    res.end();
}

server.on('request', servidor);

server.listen(3000, function(){
    console.log('Escuchando en elp  puerto 3000');
});