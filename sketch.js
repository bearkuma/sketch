window.onload = function () {
	var socketio = io.connect();
	//要素取得列挙
	var back = document.getElementById('back');
	var go = document.getElementById('go');
	var eraseAll = document.getElementById('eraseAll');
	var black = document.getElementById('black');
	var red = document.getElementById('red');
	var green = document.getElementById('green');
	var blue = document.getElementById('blue');
	var yellow = document.getElementById('yellow');
	var aqua = document.getElementById('aqua');
	var purple = document.getElementById('purple');
	var white = document.getElementById('white');
	var superthin = document.getElementById('superthin');
	var thin = document.getElementById('thin');
	var middle = document.getElementById('middle');
	var thick = document.getElementById('thick');
	var superthick = document.getElementById('superthick');
	var wrapper = document.getElementById('wrapper');
	var showingPencil = document.getElementById('showingPencil');
	var intoImg = document.getElementById('intoImg');
	//パネルボタンの挙動設定
	var colorSelect = document.getElementById('colorSelect');
	var boldSelect = document.getElementById('boldSelect');
	var colorBox = document.getElementById('colorBox');
	var boldBox = document.getElementById('boldBox');
	colorSelect.onclick = function(){		
  		if(colorBox.style.display === 'block') {
    		colorBox.style.display = 'none';
  		} else {
    		colorBox.style.display = 'block';
  		}
	}
	boldSelect.onclick = function(){
  		if(boldBox.style.display === 'block') {
    		boldBox.style.display = 'none';
  		} else {
    		boldBox.style.display = 'block';
  		}
	}
 //お絵かき張本体
	var canvas = document.getElementById('canvas');	
	
	//cursor画像の初期設定
	canvas.style.cursor = 'url(color_pencils/black95.png) 0 95,auto';
		
	var w = wrapper.clientWidth;
	var h = wrapper.clientHeight;
	canvas.width = w;
	canvas.height = h;
	
	if (canvas && canvas.getContext){
		var ctx = canvas.getContext('2d');
		ctx.strokeStyle = '#000';
		ctx.lineWidth =6;
		ctx.lineCap = 'round';
		//色の変更
			//cursor画像変更のためのメソッド作成(色変更)
			function getBold(){
				var beforeColorPencil = canvas.style.cursor;
				var boldString = beforeColorPencil.match('[0-9]{2,3}')[0];
				return boldString;
			}
		black.onclick = function(){
			canvas.style.cursor = 'url(color_pencils/black' + getBold() +'.png) 0 ' + getBold() + ',auto';
			showingPencil.innerHTML = '<img id = "pencil-picture" src="color_pencils/black111.png">';
			colorBox.style.display = 'none';
			ctx.strokeStyle = '#000';
		};
		red.onclick = function(){
			canvas.style.cursor = 'url(color_pencils/red' + getBold() +'.png) 0 ' + getBold() + ',auto';
			showingPencil.innerHTML = '<img id = "pencil-picture" src="color_pencils/red111.png">';
			colorBox.style.display = 'none';
			ctx.strokeStyle = '#F00';
		};
		green.onclick = function(){
			canvas.style.cursor = 'url(color_pencils/green' + getBold() +'.png) 0 ' + getBold() + ',auto';
			showingPencil.innerHTML = '<img id = "pencil-picture" src="color_pencils/green111.png">';
			colorBox.style.display = 'none';
			ctx.strokeStyle = '#0F0';
		};
		blue.onclick = function(){
			canvas.style.cursor = 'url(color_pencils/blue' + getBold() +'.png) 0 ' + getBold() + ',auto';
			showingPencil.innerHTML = '<img id = "pencil-picture" src="color_pencils/blue111.png">';
			colorBox.style.display = 'none';
			ctx.strokeStyle = '#00F';
		};
		yellow.onclick = function(){
			canvas.style.cursor = 'url(color_pencils/yellow' + getBold() +'.png) 0 ' + getBold() + ',auto';
			showingPencil.innerHTML = '<img id = "pencil-picture" src="color_pencils/yellow111.png">';
			colorBox.style.display = 'none';
			ctx.strokeStyle = '#FF0';
		};
		aqua.onclick = function(){
			canvas.style.cursor = 'url(color_pencils/aqua' + getBold() +'.png) 0 ' + getBold() + ',auto';
			showingPencil.innerHTML = '<img id = "pencil-picture" src="color_pencils/aqua111.png">';
			colorBox.style.display = 'none';
			ctx.strokeStyle = '#0FF';
		};
		purple.onclick = function(){
			canvas.style.cursor = 'url(color_pencils/purple' + getBold() +'.png) 0 ' + getBold() + ',auto';
			showingPencil.innerHTML = '<img id = "pencil-picture" src="color_pencils/purple111.png">';
			colorBox.style.display = 'none';
			ctx.strokeStyle = '#F0F';
		};
		white.onclick = function(){
			canvas.style.cursor = 'url(color_pencils/white' + getBold() +'.png) 0 ' + getBold() + ',auto';
			showingPencil.innerHTML = '<img id = "pencil-picture" src="color_pencils/white111.png">';
			colorBox.style.display = 'none';
			ctx.strokeStyle = '#FFF';
		};
		//太さの変更
			//cursor画像変更のためのメソッド作成(太さ変更)
		function changeBold(boldNum){
			var beforeBoldPencil = canvas.style.cursor;
			var afterBoldPencil = beforeBoldPencil.replace(/[0-9]{2,3}/g,boldNum);
			canvas.style.cursor = afterBoldPencil;
		}
		superthin.onclick = function(){
			changeBold(50);
			boldBox.style.display = 'none';
			ctx.lineWidth = 1;
		};
		thin.onclick = function(){
			changeBold(75);
			boldBox.style.display = 'none';
			ctx.lineWidth = 3;
		};
		middle.onclick = function(){
			changeBold(95);
			boldBox.style.display = 'none';
			ctx.lineWidth = 6;
		};
		thick.onclick = function(){
			changeBold(111);
			boldBox.style.display = 'none';
			ctx.lineWidth = 9;
		};
		superthick.onclick = function(){
			changeBold(125);
			boldBox.style.display = 'none';
			ctx.lineWidth = 14;
		};
		//全消の実装
		eraseAll.onclick = function(){
			if(window.confirm('全て消します。本当によろしいですか？')){	
			ctx.fillStyle = '#FFF';
			ctx.fillRect(0,0,w,h);
			pathLog.push("#FFF",h,0,h/2,[w],[h/2	]);
			sketchLog.push(pathLog);		
			pathLog = [];
			}
		};
		//ポインタの座標を取得
		var offsetX;
		var offsetY;
		canvas.addEventListener('mousedown',function(e){
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		var canvasRect = canvas.getBoundingClientRect();
		var positionX = canvasRect.left + window.scrollX;
		var positionY = canvasRect.top + window.scrollY;	
		offsetX = mouseX - positionX;
		offsetY = mouseY - positionY;
		});
		var offsetX2;
		var offsetY2;
		canvas.addEventListener('mousemove',function(e){
		var mouseX2 = e.pageX;
		var mouseY2 = e.pageY;
		var canvasRect2 = canvas.getBoundingClientRect();
		var positionX2 = canvasRect2.left + window.scrollX;
		var positionY2 = canvasRect2.top + window.scrollY;	
		offsetX2 = mouseX2 - positionX2;
		offsetY2 = mouseY2 - positionY2;
		});
		var offsetX3;
		var offsetY3;
		canvas.addEventListener('mouseup',function(e){
		var mouseX3 = e.pageX;
		var mouseY3 = e.pageY;
		var canvasRect3 = canvas.getBoundingClientRect();
		var positionX3 = canvasRect3.left + window.scrollX;
		var positionY3 = canvasRect3.top + window.scrollY;	
		offsetX3 = mouseX3 - positionX3;
		offsetY3 = mouseY3 - positionY3;
		});
		var offsetX4;
		var offsetY4;
		canvas.addEventListener('mouseout',function(e){
		var mouseX4 = e.pageX;
		var mouseY4 = e.pageY;
		var canvasRect4 = canvas.getBoundingClientRect();
		var positionX4 = canvasRect4.left + window.scrollX;
		var positionY4 = canvasRect4.top + window.scrollY;	
		offsetX4 = mouseX4 - positionX4;
		offsetY4 = mouseY4 - positionY4;
		});
		canvas.addEventListener('mouseover',function(e){
		var mouseX5 = e.pageX;
		var mouseY5 = e.pageY;
		var canvasRect5 = canvas.getBoundingClientRect();
		var positionX5 = canvasRect5.left + window.scrollX;
		var positionY5 = canvasRect5.top + window.scrollY;	
		offsetX5 = mouseX5 - positionX5;
		offsetY5 = mouseY5 - positionY5;
		});
		
		
		//左ボタンが押されたら描画準備
	
		canvas.onmousedown = function(e){
		/*
			ctx.beginPath();
			ctx.moveTo(offsetX,offsetY);
			ctx.lineTo(offsetX,offsetY);
			lineToXLog.push(offsetX);
			lineToYLog.push(offsetY);
			ctx.stroke();
		*/
			socketio.emit('mousedown',{x:offsetX,y:offsetY})
		};
		//ポインタが動いたら描画
		canvas.onmousemove = function(e){
			if(e.buttons === 1){
		/*	
			memoryLog = [];
			ctx.lineTo(offsetX2,offsetY2);
			lineToXLog.push(offsetX2);
			lineToYLog.push(offsetY2);
			ctx.stroke();
			}
		*/
				socketio.emit('mousemove',{x:offsetX2,y:offsetY2})
			};
		};
		
		/*左ボタンが離されたらpathLogを作成し、sketchLogへ保存後削除する。
		　また、lineToXLogとlineToYLogも初期化しておく。
		*/
		canvas.onmouseup = function(e){
			pathLog.push(ctx.strokeStyle,ctx.lineWidth,offsetX,offsetY,lineToXLog,lineToYLog);
			sketchLog.push(pathLog);
			pathLog = [];
			lineToXLog =[];
			lineToYLog =[];
		};
		//ポインタが画面外へ出て行った時の挙動
		canvas.onmouseout = function (e){
			if(e.buttons === 1){
			memoryLog = [];
			pathLog.push(ctx.strokeStyle,ctx.lineWidth,offsetX,offsetY,lineToXLog,lineToYLog);
			sketchLog.push(pathLog);
			pathLog = [];
			lineToXLog =[];
			lineToYLog =[];
			}
		};
		//ポインタが画面内へ入った時の挙動
		canvas.onmouseover = function(e){
			if(e.buttons === 1){
			 ctx.beginPath();
			 ctx.moveTo(offsetX5,offsetY5);
			 offsetX = offsetX5;
			 offsetY = offsetY5;
			}
		}
		//戻るボタンと進むボタンの挙動
		var sketchLog = [];//今までの全ての描写情報を保存する配列を用意
		var pathLog = [];//1つのパスの間の描写情報を保存する配列を用意
		var lineToXLog = [];//lineTo情報(X)を保存する配列を用意
		var lineToYLog = [];//lineTo情報(Y)を保存する配列を用意
		var memoryLog = [];//戻るボタンで消した描写情報を保存する配列を用意
		back.onclick = function(){
			if(sketchLog.length > 0){
				ctx.save(); 
				ctx.fillStyle = '#FFF';
				ctx.fillRect(0,0,w,h);
				memoryLog.push(sketchLog.pop());
				for (var i = 0; i < sketchLog.length; i++){
					ctx.beginPath();
					ctx.strokeStyle = sketchLog[i][0];
					ctx.lineWidth = sketchLog[i][1];
					ctx.moveTo(sketchLog[i][2],sketchLog[i][3]);
					for (var k = 0; k < sketchLog[i][4].length; k++){
						ctx.lineTo(sketchLog[i][4][k],sketchLog[i][5][k]);
					}
					ctx.stroke();
				}
				ctx.restore();
			}
		}
		go.onclick = function(){
			if(memoryLog.length > 0){
				ctx.save();
				ctx.fillStyle = '#FFF';
				ctx.fillRect(0,0,w,h);
				sketchLog.push(memoryLog.pop());
				for (var i = 0; i < sketchLog.length; i++){
					ctx.beginPath();
					ctx.strokeStyle = sketchLog[i][0];
					ctx.lineWidth = sketchLog[i][1];
					ctx.moveTo(sketchLog[i][2],sketchLog[i][3]);
					for (var k = 0; k < sketchLog[i][4].length; k++){
						ctx.lineTo(sketchLog[i][4][k],sketchLog[i][5][k]);
					}
					ctx.stroke();
				}
				ctx.restore();
			}
		}
		//画像化して保存する
		intoImg.onclick = function(){
			ctx.fillStyle = '#FFF';
			ctx.fillRect(0,0,w,h);
			for (var i = 0; i < sketchLog.length; i++){
					ctx.beginPath();
					ctx.strokeStyle = sketchLog[i][0];
					ctx.lineWidth = sketchLog[i][1];
					ctx.moveTo(sketchLog[i][2],sketchLog[i][3]);
					for (var k = 0; k < sketchLog[i][4].length; k++){
						ctx.lineTo(sketchLog[i][4][k],sketchLog[i][5][k]);
					}
					ctx.stroke();
			}
			var imgUrl =canvas.toDataURL();	
			var mydraw = document.createElement('a');
         		var filename = prompt('何というファイル名で保存しますか')
            		if(filename){
              	  		mydraw.download = filename+'.png';
                		mydraw.href = imgUrl;
                		document.body.appendChild(mydraw);
                		mydraw.click();
                		document.body.removeChild(mydraw);
				window.open(imgUrl);
			}
		}
	}
	
		
		start();
		function start(){
			socketio.emit('enter',{value: '入室'});
		}
		
		socketio.on('enter', function(data){
			var hand = data.userId;
			hand = canvas.getContext('2d');
			console.log('start server');
			
		});
		socketio.on('mousedown', function(data){
			var hand = data.userId;
			hand = canvas.getContext('2d');
			mdown(data.x,data.y);
			function mdown(x,y){
			hand.beginPath();
			hand.moveTo(x,y);
			hand.lineTo(x,y);
			hand.stroke();
		}
		});
		socketio.on('mousemove', function(data){
			var hand = data.userId;
			hand = canvas.getContext('2d');
			mmove(data.x,data.y);
			function mdown(x,y){
			hand.lineTo(offsetX2,offsetY2);
			hand.stroke();
		}
		});
		
}
