//VisualHack for 2D Scaling By Erick Stevens Velasco Amaya
//Universidad Nacional de Colombia

var sketch = function( p ) {
	var m = 1;
	var xr = 0;
	var yr = 0;
	
	p.setup = function() {
		p.createCanvas(640, 380);
		p.smooth();
	}

	p.draw = function() {
		p.background(64);
		drawPivot();

		//1. T(xr, yr)
		p.translate(xr, yr);
		//2. S(alpha);
		p.scale(m);
		//3. T(-xr, -yr)
		p.translate(-xr, -yr);

		drawShape();
	}

	//With left click change coordinates for pivot
	p.mousePressed = function() {
	  xr = p.mouseX;
	  yr = p.mouseY;
	}

	//With mouse scrool change the size for scaling
	p.mouseWheel = function(event) {
	  m += (event.delta/800.0);
	}

	//With the 0 key puts the pivot on (0,0) coordinates
	p.keyPressed = function(){
	  if(p.key == '0'){
		xr = 0;
		yr = 0;
	  }
	}
	
	//Draw the pivot
	function drawPivot() {
		p.push();
		p.stroke(255, 0, 0);
		p.strokeWeight(6);
		p.point(xr, yr);
		p.pop();
	}

	//Draw the shape
	function drawShape() {
		p.push();
		
		p.noStroke();
		p.beginShape();
		p.fill(46, 134, 193);
		p.vertex(100, 100);
		p.vertex(100, 200);
		p.vertex(160, 200);
		p.vertex(160, 150);
		p.vertex(130, 150);
		p.vertex(130, 100);
		p.endShape(p.CLOSE);
		
		p.pop();
	}
};

new p5(sketch, 'scaling2d_id');
