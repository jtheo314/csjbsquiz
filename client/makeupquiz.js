


Template.makeupquiz.events({

	"click #drawpolygon": function(event){
		context= drawspace.getContext("2d");
		array= [];
		start= true;
		drawPolygon();
	},


	"click #erasepoly": function(event){
		clearUp();
		inUse= false;

	}
});

var array= [];
var context;
var start= true;


Template.makeupquiz.rendered= function() { 
	//reboot the canvas
	context= drawspace.getContext("2d");
	context.fillStyle= "#B2B2B2";
	context.fillRect(0, 0, drawspace.width, drawspace.height);
	//Make original triangle show up when navigating to page.
	context.beginPath();
	//Random coordinates, didn't think it mattered if it was placed 
	//exactly where your initial triangle was.
	context.moveTo(350,350);
	context.lineTo(280,130);
	context.lineTo(440,290);
	context.closePath();
	context.strokeStyle= "#00A300";
	context.stroke();
};


function makePoly() {
    if(inUse == true) {
    	clearUp();
		linesGreenness();
	}
}


var x, y, xNext, yNext;


function drawPolygon(){
	var drawspace= document.getElementById("drawspace");

	drawspace.addEventListener("mousemove",function(e){
		if(inUse == true){ makePoly();
		//Once stopped (clicked), a yellow line appears.
		if(stop== true){ return;}
			context.beginPath();
			context.moveTo(x, y);
			yNext=(e.pageY-drawspace.offsetTop);
			xNext=(e.pageX-drawspace.offsetLeft);
		   	context.lineTo(xNext, yNext);
		   	//Yellow line whilst moving to new point.
		   	context.strokeStyle= "#FFFF00";
		   	context.stroke();
		   	context.closePath();
		}
	});


	//When the mouse isn't held down or clicking, the "drawing" is still
	//in use and the yellow line is still moving.
	drawspace.addEventListener("mouseup",function(e){inUse= true;});
	drawspace.addEventListener("mousedown",function(e) {


		if(start== true) {inUse= true;
			y=(e.pageY-drawspace.offsetTop);
			x=(e.pageX-drawspace.offsetLeft);
	    	start = false;
	    }else{
		inUse= false;
	   	array.push({
	   		firstx: x, firsty: y, nexx: xNext, nexy: yNext
	   	});
	   	x= xNext;

	   	y= yNext;
	    }
	finishPoly();
});


}

//After a coordinate is clicked.
function linesGreenness(){
	for (var i in array) {
	    context.beginPath();
	    context.moveTo(array[i].firstx, array[i].firsty);
	    context.lineTo(array[i].nexx, array[i].nexy);

	    context.strokeStyle= "#00A300";
	    context.stroke();
	}
	context.closePath();
}


var inUse, stop= false;


function finishPoly(){
	if (array.length > 0){

		var initialx= array[0].firstx;
		var initialy= array[0].firsty;
		stop= ((Math.abs(initialx - x || initialy- y)) <= 5);
		//The polygon continues if the point clicked on is more than 5 pixels away
		//(either x coordinate or y coordinate) from the original x and y coordinates.
	}
}


//reboot the canvas
function clearUp(){
	context.clearRect(0, 0, drawspace.width, drawspace.height);
    context.fillRect(0, 0, drawspace.width, drawspace.height);
	context.fillStyle= "#B2B2B2";
}


