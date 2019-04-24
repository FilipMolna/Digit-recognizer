

var canvasWidth           	= 280;
var canvasHeight 			= 280;
var canvasStrokeStyle		= "white";
var canvasLineJoin			= "round";
var canvasLineWidth       	= 20;
var canvasBackgroundColor 	= "black";
var canvasId              	= "canvas";

var clickX = new Array();
var clickY = new Array();
var clickD = new Array();
var drawing;

document.getElementById('chart_box').innerHTML = "";
document.getElementById('chart_box').style.display = "none";

//---------------
// Create canvas
//---------------
var canvasBox = document.getElementById('canvas_box');
var canvas    = document.createElement("canvas");

canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight);
canvas.setAttribute("id", canvasId);
canvas.style.backgroundColor = canvasBackgroundColor;
canvasBox.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas);
}

ctx = canvas.getContext("2d");

//---------------------
// MOUSE DOWN function
//---------------------
$("#canvas").mousedown(function(e) {
	var mouseX = e.pageX - this.offsetLeft;
	var mouseY = e.pageY - this.offsetTop;

	drawing = true;
	addUserGesture(mouseX, mouseY);
	drawOnCanvas();
});

//-----------------------
// TOUCH START function
//-----------------------
canvas.addEventListener("touchstart", function (e) {
	if (e.target == canvas) {
    	e.preventDefault();
  	}

	var rect = canvas.getBoundingClientRect();
	var touch = e.touches[0];

	var mouseX = touch.clientX - rect.left;
	var mouseY = touch.clientY - rect.top;

	drawing = true;
	addUserGesture(mouseX, mouseY);
	drawOnCanvas();

}, false);

//---------------------
// MOUSE MOVE function
//---------------------
$("#canvas").mousemove(function(e) {
	if(drawing) {
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
		addUserGesture(mouseX, mouseY, true);
		drawOnCanvas();
	}
});

//---------------------
// TOUCH MOVE function
//---------------------
canvas.addEventListener("touchmove", function (e) {
	if (e.target == canvas) {
    	e.preventDefault();
  	}
	if(drawing) {
		var rect = canvas.getBoundingClientRect();
		var touch = e.touches[0];

		var mouseX = touch.clientX - rect.left;
		var mouseY = touch.clientY - rect.top;

		addUserGesture(mouseX, mouseY, true);
		drawOnCanvas();
	}
}, false);

//-------------------
// MOUSE UP function
//-------------------
$("#canvas").mouseup(function(e) {
	drawing = false;
});

//---------------------
// TOUCH END function
//---------------------
canvas.addEventListener("touchend", function (e) {
	if (e.target == canvas) {
    	e.preventDefault();
  	}
	drawing = false;
}, false);

//----------------------
// MOUSE LEAVE function
//----------------------
$("#canvas").mouseleave(function(e) {
	drawing = false;
});

//-----------------------
// TOUCH LEAVE function
//-----------------------
canvas.addEventListener("touchleave", function (e) {
	if (e.target == canvas) {
    	e.preventDefault();
  	}
	drawing = false;
}, false);

//--------------------
// ADD CLICK function
//--------------------
function addUserGesture(x, y, dragging) {
	clickX.push(x);
	clickY.push(y);
	clickD.push(dragging);
}

//-------------------
// RE DRAW function
//-------------------
function drawOnCanvas() {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	ctx.strokeStyle = canvasStrokeStyle;
	ctx.lineJoin    = canvasLineJoin;
	ctx.lineWidth   = canvasLineWidth;

	for (var i = 0; i < clickX.length; i++) {
		ctx.beginPath();
		if(clickD[i] && i) {
			ctx.moveTo(clickX[i-1], clickY[i-1]);
		} else {
			ctx.moveTo(clickX[i]-1, clickY[i]);
		}
		ctx.lineTo(clickX[i], clickY[i]);
		ctx.closePath();
		ctx.stroke();
	}
}

//------------------------
// CLEAR CANVAS function
//------------------------
function clearCanvas(id) {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	clickX = new Array();
	clickY = new Array();
	clickD = new Array();
}


// (function() {
    
//     var canvas = document.querySelector('#canvas');
//     var ctx = canvas.getContext('2d');
    
//     var sketch = document.querySelector('#kresba');
//     var sketch_style = getComputedStyle(sketch);
//     canvas.width = parseInt(sketch_style.getPropertyValue('width'));
//     canvas.height = parseInt(sketch_style.getPropertyValue('height'));
    
    
//     // Creating a tmp canvas
//     var tmp_canvas = document.createElement('canvas');
//     var tmp_ctx = tmp_canvas.getContext('2d');
//     tmp_canvas.id = 'tmp_canvas';
//     tmp_canvas.width = canvas.width;
//     tmp_canvas.height = canvas.height;
    
//     sketch.appendChild(tmp_canvas);

//     var mouse = {x: 0, y: 0};
//     var last_mouse = {x: 0, y: 0};
    
//     // Pencil Points
//     var ppts = [];
    
//     /* Mouse Capturing Work */
//     tmp_canvas.addEventListener('mousemove', function(e) {
//         mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
//         mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
//     }, false);
    
    
//     /* Drawing on Paint App */
//     tmp_ctx.lineWidth = 3;
//     tmp_ctx.lineJoin = 'round';
//     tmp_ctx.lineCap = 'round';
//     tmp_ctx.strokeStyle = 'black';
//     tmp_ctx.fillStyle = 'black';
    
//     tmp_canvas.addEventListener('mousedown', function(e) {
//         tmp_canvas.addEventListener('mousemove', onPaint, false);
        
//         mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
//         mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
        
//         ppts.push({x: mouse.x, y: mouse.y});
        
//         onPaint();
//     }, false);
    
//     tmp_canvas.addEventListener('mouseup', function() {
//         tmp_canvas.removeEventListener('mousemove', onPaint, false);
        
//         // Writing down to real canvas now
//         ctx.drawImage(tmp_canvas, 0, 0);
//         // Clearing tmp canvas
//         tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
        
//         // Emptying up Pencil Points
//         ppts = [];
//     }, false);
    
//     var onPaint = function() {
        
//         // Saving all the points in an array
//         ppts.push({x: mouse.x, y: mouse.y});
        
//         if (ppts.length < 3) {
//             var b = ppts[0];
//             tmp_ctx.beginPath();
//             //ctx.moveTo(b.x, b.y);
//             //ctx.lineTo(b.x+50, b.y+50);
//             tmp_ctx.arc(b.x, b.y, tmp_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
//             tmp_ctx.fill();
//             tmp_ctx.closePath();
            
//             return;
//         }
        
//         // Tmp canvas is always cleared up before drawing.
//         tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
        
//         tmp_ctx.beginPath();
//         tmp_ctx.moveTo(ppts[0].x, ppts[0].y);
        
//         for (var i = 1; i < ppts.length - 2; i++) {
//             var c = (ppts[i].x + ppts[i + 1].x) / 2;
//             var d = (ppts[i].y + ppts[i + 1].y) / 2;
            
//             tmp_ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
//         }
        
//         // For the last 2 points
//         tmp_ctx.quadraticCurveTo(
//             ppts[i].x,
//             ppts[i].y,
//             ppts[i + 1].x,
//             ppts[i + 1].y
//         );
//         tmp_ctx.stroke();
        
//     };
    
// }());
		