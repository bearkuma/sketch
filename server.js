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
var users = [];
var allusers = [];
io.sockets.on('connection',function(socket){
			　　
			  socket.on('enter',function(data){
				  var user = socket.id;
				  users.push(socket.id);
     			  allusers.push(socket.id);
				  if(allusers.length != 0){
					io.to(socket.id).emit('onlyMe', {users:allusers,userId:user});
				  }
				
				socket.broadcast.emit('enter',{userId:user});
				//io.sockets.emit('enter',{userId:user});
			
			})
			  
			  socket.on('mousedown',function(data){
				 
				var user = socket.id;
				socket.broadcast.emit('mousedown',{x:data.x,y:data.y,x2:data.x2,y2:data.y2,userId:user,style:data.style,width:data.width});
				
			})
			 socket.on('mousemove',function(data){
				
				var user = socket.id;
				socket.broadcast.emit('mousemove',{x:data.x,y:data.y,userId:user,style:data.style,width:data.width});
	
			 })
			 socket.on('mouseup',function(data){
				var user = socket.id;
				socket.broadcast.emit('mouseup',{x:data.x,y:data.y,userId:user,style:data.style,width:data.width,lineToXlog:data.lineToXlog,lineToYLog:data.lineToYLog});
			})
			 socket.on('mouseout',function(data){
				var user = socket.id;
				socket.broadcast.emit('mouseout',{x:data.x,y:data.y,userId:user,style:data.style,width:data.width,lineToXlog:data.lineToXlog,lineToYLog:data.lineToYLog});
			})
			 socket.on('mouseover',function(data){
				var user = socket.id;
				socket.broadcast.emit('mouseover',{x:data.x,y:data.y,userId:user});
			})
			socket.on('eraseAll',function(data){
				var user = socket.id;
				io.sockets.emit('eraseAll',{user:user,users:allusers});
			})
			
			socket.on('disconnect',function(){
				var idx = users.indexOf(socket.id);
				if(idx >= 0){
 					users.splice(idx, 1); 
				}
			})
			
			socket.on('getallusers',function(data){
				var user = socket.id;
				io.to(socket.id).emit('getallusers', {users:allusers,userId:user});
				
			})
			
			 
});
