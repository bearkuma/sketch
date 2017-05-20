var port = process.env.PORT || 8080,
	http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs');

var server = http.createServer(function(req,res){
	if (req.url ==='/'){
		req.url = '/sketch.html';
	}
	var x = url.parse(req.url,true);
	var fullpath = path.resolve(__dirname,'.'+x.pathname);
	if (fs.existsSync(fullpath)){
		var ext = path.extname(fullpath).toLowerCase();
		if(ext.match('html')){
			res.writeHead(200,{'Content-type':'text/html'});
			var strm = fs.createReadStream(fullpath);
			strm.pipe(res);
		} else if (ext.match(/\.(png|jpg|jpeg|gif||css|js)$/) && x.pathname != '/chatserver.js'){
			var strm = fs.createReadStream(fullpath);
			strm.pipe(res);
		} else {
			res.writeHead(404,{'Content-type':'text/plain'});
			res.end('404 not found');
		}
	} else {
			res.writeHead(404,{'Content-type':'text/plain'});
			res.end('404 not found');		
	}
}).listen(port);
console.log('start server');

var io = require('socket.io').listen(server);

io.sockets.on('connection',function(socket){
			  socket.on('enter',function(data){
				var user = socket.id;
				io.sockets.emit('enter',{userId:user});
			})
			  socket.on('mousedown',function(data){
				var user = socket.id;
				io.sockets.emit('mousedown',{x:data.x,y:data.y,userId:user});
			})
			 socket.on('mousemove',function(data){
				var user = socket.id;
				io.sockets.emit('mousedown',{x:data.x,y:data.y,userId:user});
			})
			 socket.on('mouseup',function(data){
				var msg = 
				io.sockets.emit('mouseup',{value: msg});
			})
			 socket.on('mouseout',function(data){
				var msg = 
				io.sockets.emit('mouseout',{value: msg});
			})
			 socket.on('mouseover',function(data){
				var msg = 
				io.sockets.emit('mouseover',{value: msg});
			})
});