/**
 Orthographic
 by Jean Pierre Charalambos.

 Adaptation of https://p5js.org/reference/#/p5/ortho
*/

var sketch = function( p ) {
    p.setup = function() {
      p.createCanvas(700, 700, p.WEBGL);
      p.ortho(-p.width / 2, p.width / 2, p.height / 2, -p.height / 2, 0, 1000);
    };

    p.draw = function() {
        p.background(100);
        p.orbitControl();
        p.strokeWeight(2);
        p.stroke(255, 0, 0);
        p.fill(0, 255, 255, 125);
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

new p5(sketch, 'orthographic_id');
