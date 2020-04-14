/**
 Perspective
 by Jean Pierre Charalambos.

 Adaptation of https://p5js.org/reference/#/p5/perspective
*/

var sketch = function( p ) {
    p.setup = function() {
      p.createCanvas(700, 700, p.WEBGL);
      var fov = 60 / 180 * p.PI;
      var cameraZ = p.height / 2.0 / p.tan(fov / 2.0);
      p.perspective(60 / 180 * p.PI, p.width / p.height, cameraZ * 0.1, cameraZ * 10);
    };

    p.draw = function() {
        p.background(100);
        p.orbitControl();
        p.strokeWeight(2);
        p.stroke(0, 255, 0);
        p.fill(255, 0, 255, 125);
        for (var i = -1; i < 2; i++) {
            for (var j = -2; j < 3; j++) {
                p.push();
                p.translate(i * 160, 0, j * 160);
                p.box(80, 80, 80);
                p.pop();
            }
        }
    };
};

new p5(sketch, 'perspective_id');
