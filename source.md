<section id="themes">
	<h2>Themes</h2>
		<p>
			Set your presentation theme: <br>
			<!-- Hacks to swap themes after the page has loaded. Not flexible and only intended for the reveal.js demo deck. -->
                        <a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/black.css'); return false;">Black (default)</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/white.css'); return false;">White</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/league.css'); return false;">League</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/sky.css'); return false;">Sky</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/beige.css'); return false;">Beige</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/simple.css'); return false;">Simple</a> <br>
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/serif.css'); return false;">Serif</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/blood.css'); return false;">Blood</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/night.css'); return false;">Night</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/moon.css'); return false;">Moon</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/solarized.css'); return false;">Solarized</a>
		</p>
</section>

H:

# SceneGraphs

Jean Pierre Charalambos  
Universidad Nacional de Colombia

H:

## Index

 1. Intro<!-- .element: class="fragment" data-fragment-index="1"-->
    * Active vs pasive transformations
    * Composition
    * Main spaces
 2. Modelling and view<!-- .element: class="fragment" data-fragment-index="2"-->
 3. Matrix handling in the p5.treegl framework<!-- .element: class="fragment" data-fragment-index="3"-->
 4. References<!-- .element: class="fragment" data-fragment-index="4"-->
 
H:

## Intro: Active vs passive transformations

<font color="yellow"> Active Transformation (standard basis) vs Passive Transformation (change of basis)</font>

<img height='300' src='fig/image3.JPG'/>

1. Check the [p5 transformations](https://www.youtube.com/watch?v=o9sgjuh-CBM) tutorial first
2. Check also the [affine transformations](http://visualcomputing.github.io/Transformations) presentation

N:

* Standard = Canonical

V:

## Intro: Affine transformations composition

Consider the following sequence of transformations:

`$P_1=M_1P,$` <!-- .element: class="fragment" data-fragment-index="1"-->
`$P_2=M_1M_2P_1,$` <!-- .element: class="fragment" data-fragment-index="2"-->
`$...,$` <!-- .element: class="fragment" data-fragment-index="3"-->
`$P_n=M_n^*P$` <!-- .element: class="fragment" data-fragment-index="4"-->

`where $M_n^*=M_1M_2...M_n$` <!-- .element: class="fragment" data-fragment-index="5"-->

Observation: The above composed transform may be implemented either with low-level matrix multiplication (applyMatrix(matrix)) or with mid-level functions such as: translate(), rotate(), scale(). <!-- .element: class="fragment" data-fragment-index="6"-->

H:

## Modelling and view

Consider the function `axes()` which draws the X (horizontal) and Y vertical) axes:

```js
function axes() {
  push();
  // X-Axis
  strokeWeight(4);
  stroke(255, 0, 0);
  fill(255, 0, 0);
  line(0, 0, 100, 0);//horizontal red X-axis line
  text("X", 100 + 5, 0);
  // Y-Axis
  stroke(0, 0, 255);
  fill(0, 0, 255);
  line(0, 0, 0, 100);//vertical blue Y-axis line
  text("Y", 0, 100 + 15);
  pop();
}
```

V:

## Modelling and view

let's first call the `axes()` function to see what it does:

```js
function draw() {
  background(50);
  axes();
}
```

<div id='frames1_id'></div>
<!-- .element: class="fragment" data-fragment-index="1"-->

V:

## Modelling and view

now let's call it again, but pre-translating it first:

```js
function draw() {
  background(50);
  axes();
  translate(300, 180);//translation
  axes();//2nd call
}
```

<div id='frames2_id'></div>
<!-- .element: class="fragment" data-fragment-index="1"-->

V:

## Modelling and view

let's add a rotation to the second `axes()` call:

```js
function draw() {
  background(50);
  axes();
  translate(300, 180);
  rotate(QUARTER_PI / 2);//rotation after translation
  axes();//2nd call
}
```

<div id='frames3_id'></div>
<!-- .element: class="fragment" data-fragment-index="1"-->

V:

## Modelling and view

let's do something similar with a third `axes()` call:

```js
function draw() {
  background(50);
  axes();
  translate(300, 180);
  rotate(QUARTER_PI/2);
  axes();
  translate(260, -180);
  rotate(-QUARTER_PI);
  scale(1.5);//even scaling it
  axes();//3rd call
}
```

<div id='frames4_id'></div>
<!-- .element: class="fragment" data-fragment-index="1"-->

V:

## Modelling and view

see the result when we animate only the _first_ rotation;

```js
function draw() {
  background(50);
  axes();
  translate(300, 180);
  rotate(QUARTER_PI/2 * frameCount);//animation line
  axes();
  translate(260, -180);
  rotate(-QUARTER_PI);
  scale(1.5);
  axes();
}
```

<div id='frames5_id'></div>
<!-- .element: class="fragment" data-fragment-index="1"-->

V:

## Modelling and view

and now see the result when we animate only the _second_ rotation;

```js
function draw() {
  background(50);
  axes();
  translate(300, 180);
  rotate(QUARTER_PI/2);
  axes();
  translate(260, -180);
  rotate(-QUARTER_PI * frameCount);//animation line
  scale(1.5);
  axes();
}
```

<div id='frames6_id'></div>
<!-- .element: class="fragment" data-fragment-index="1"-->

V:

## Modelling and view: [Scene-graph](https://en.wikipedia.org/wiki/Scene_graph)

> A scene-graph is a [directed acyclic graph (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph) of nodes which root is the world coordinate system

V:

## Modelling and view: Scene-graph
### Eyeless example

```js
 World
  ^
  |
 L1
  ^
  |\
 L2  L3
```

> Scenegraphs are simply and elegantly implemented by means of affine transformations using a matrix stack. See [push()](https://p5js.org/reference/#/p5/push) and [pop()](https://p5js.org/reference/#/p5/pop)

V:

## Modelling and view: Scene-graph
### Eyeless example

```js
 World
  ^
  |
 L1
  ^
  |\
 L2  L3
```

```js
function drawModel() {
  // define a local node L1 (respect to the world)
  push(); // saves current matrix transform (I)
  affineTransform1(); // resulting in: I * affineTransform1()
  drawL1();
  // define a local node L2 respect to L1
  push(); // saves current matrix transform (I * affineTransform1())
  affineTransform2(); // resulting in: I * affineTransform1() * affineTransform2()
  drawL2();
  // "return" to L1
  pop(); // removes the top of the stack, restoring I * affineTransform1()
  // define a local coordinate system L3 respect to L1
  push(); // saves current matrix transform (I * affineTransform1())
  affineTransform3(); // resulting in: I * affineTransform1() * affineTransform3()
  drawL3();
  // return to L1
  pop(); // removes the top of the stack, restoring I * affineTransform1()
  // return to World
  pop(); // removes the top of the stack, restoring I
}
```
<!-- .element: class="fragment" data-fragment-index="1"-->

V:

## Modelling and view: Scene-graph
### Eyeless example

<div id='scene-graph_id'></div>

V:

## Modelling and view: Scene-graph
### View transform (eye-node)

```js
 World
  ^
  |\
... Eye
  ^
  |\
... ...
```

Let the eye node transform be defined, like it is with any other node, as:<!-- .element: class="fragment" data-fragment-index="1"-->
`$M_{eye}^*$`<!-- .element: class="fragment" data-fragment-index="2"-->

The eye transform is therefore:<!-- .element: class="fragment" data-fragment-index="3"-->
`$\left.M_{eye}^{*}\right.^{-1}$`<!-- .element: class="fragment" data-fragment-index="4"-->

For example, for an eye node transform:<!-- .element: class="fragment" data-fragment-index="5"-->
`$M_{eye}^*=T(x,y,z)R(\beta)S(s)$`<!-- .element: class="fragment" data-fragment-index="6"-->

The eye transform would be:<!-- .element: class="fragment" data-fragment-index="7"-->
`$\left.M_{eye}^{*}\right.^{-1}=S(1/s)R(-\beta)T(-x,-y,-z)$`<!-- .element: class="fragment" data-fragment-index="8"-->

N:

`$M_{eye}^*$` would position (orient, scale, ...) the eye node
in the world, but want it to be the other way around (i.e., draw the scene from the eye point-of-view)

V:

## Modelling and view: Scene-graph
### View example

```js
 World
  ^
  |\
 L1 Eye
  ^
  |\
 L2  L3
```

```js
function draw() {
  // the following sequence would position (orient, scale, ...) the eye node in the world:
  // translate(eyePosition.x, eyePosition.y);
  // rotate(eyeOrientation);
  // scale(eyeScaling)
  // drawEye();
  scale(1/eyeScaling);
  rotate(-eyeOrientation);
  translate(-eyePosition.x, -eyePosition.y);
  drawModel();
}
```
<!-- .element: class="fragment" data-fragment-index="1"-->

V:

## Modelling and view: Scene-graph
### View example

<div id='minimap_id'></div>

H:

## Matrix handling in [p5.treegl](https://github.com/VisualComputing/p5.treegl)
### Intro: Geometry data mapping

* The _model_ matrix (`$M$`) maps from (object) <a href="#/6/8">node</a> space to world space
* The <a href="#/6/13">view</a> matrix (`$V$`) maps from world space to eye space
* The _projection_ (`$P$`) matrix maps from eye space to <a href="#/7">clip space</a>

> Composing all three, i.e.,  `$P * V * M$`, would thus map from object space to clip space

V:

## Matrix handling in [p5.treegl](https://github.com/VisualComputing/p5.treegl)
### Intro: Matrix stack naming conventions

1. <a href="#/4/11">When the bottom of the matrix stack is filled with the identity matrix</a> (`$I$`), its top is referred to as the _model_ matrix
2. <a href="#/4/17">When the bottom of the matrix stack is filled with the view matrix</a> (`$V$`), its top is referred to as the _modelview_ matrix

V:

## Matrix handling in [p5.treegl](https://github.com/VisualComputing/p5.treegl)
### [Basic matrices](https://github.com/VisualComputing/p5.treegl#basic-matrices)

1. `iMatrix()`: Returns the identity matrix.
2. `tMatrix(matrix)`: Returns the tranpose of `matrix`.
3. `invMatrix(matrix)`: Returns the inverse of `matrix`.
4. `axbMatrix(a, b)`: Returns the product of the `a` and `b` matrices.
5. `lMatrix(from, to)`: Returns the 4x4 matrix that transforms locations (points) from matrix `from` to matrix `to`.
6. `dMatrix(from, to)`: Returns the 3x3 matrix that transforms displacements (vectors) from matrix `from` to matrix `to`. The `nMatrix` below is a special case of this one.

**Observation:** All returned matrices are instances of [p5.Matrix](https://github.com/processing/p5.js/blob/main/src/webgl/p5.Matrix.js).

V:

## Matrix handling in [p5.treegl](https://github.com/VisualComputing/p5.treegl)
### [Space transformations](https://github.com/VisualComputing/p5.treegl#space-transformations)

1. `treeLocation(vector, [{[from = SCREEN], [to = WORLD], [pMatrix], [vMatrix], [eMatrix], [pvMatrix], [pvInvMatrix]}])`: transforms locations (points) from matrix `from` to matrix `to`. 
2. `treeDisplacement(vector, [{[from = EYE], [to = WORLD], [vMatrix], [eMatrix], [pMatrix]}])`: transforms displacements (vectors) from matrix `from` to matrix `to`.

**Observations**

1. Returned transformed vectors are instances of [p5.Vector](https://p5js.org/reference/#/p5.Vector).
2. `from` and `to` may also be specified as either: `'WORLD'`, `'EYE'`, `'SCREEN'` or `'NDC'`.
3. When no matrix params are passed the renderer [current values](#matrix-queries) are used instead.

V:

## Matrix handling in [p5.treegl](https://github.com/VisualComputing/p5.treegl)
### [Matrix queries](https://github.com/VisualComputing/p5.treegl#matrix-queries)

1. `pMatrix()`: Returns the current projection matrix.
2. `mvMatrix([{[vMatrix], [mMatrix]}])`: Returns the modelview matrix.
3. `mMatrix([{[eMatrix], [mvMatrix]}])`: Returns the model matrix.
4. `eMatrix()`: Returns the current eye matrix (the inverse of `vMatrix()`). In addition to `p5` and [p5.RendererGL](https://p5js.org/reference/#/p5.Renderer) instances, this method is also available to [p5.Camera](https://p5js.org/reference/#/p5.Camera) objects.
5. `vMatrix()`: Returns the view matrix (the inverse of `eMatrix()`). In addition to `p5` and [p5.RendererGL](https://p5js.org/reference/#/p5.Renderer) instances, this method is also available to [p5.Camera](https://p5js.org/reference/#/p5.Camera) objects.
6. `pvMatrix([{[pMatrix], [vMatrix]}])`: Returns the projection times view matrix.
7. `pvInvMatrix([{[pMatrix], [vMatrix], [pvMatrix]}])`: Returns the `pvMatrix` inverse.
8. `nMatrix([{[vMatrix], [mMatrix], [mvMatrix]}])`: Returns the [normal matrix](http://www.lighthouse3d.com/tutorials/glsl-12-tutorial/the-normal-matrix/).

**Observations**

1. All returned matrices are instances of [p5.Matrix](https://github.com/processing/p5.js/blob/main/src/webgl/p5.Matrix.js).
2. When no matrix params are passed the renderer [current values](#matrix-queries) are used instead.

V:

## Matrix handling in [p5.treegl](https://github.com/VisualComputing/p5.treegl)
### [Frustum queries](https://github.com/VisualComputing/p5.treegl#frustum-queries)

1. `lPlane([pMatrix])`: Returns the left clipping plane.
2. `rPlane([pMatrix])`: Returns the right clipping plane.
3. `bPlane([pMatrix])`: Returns the bottom clipping plane.
4. `tPlane([pMatrix])`: Returns the top clipping plane.
5. `nPlane([pMatrix])`: Returns the near clipping plane.
6. `fPlane([pMatrix])`: Returns the far clipping plane.
7. `fov([pMatrix])`: Returns the vertical field-of-view (fov) in radians.
8. `hfov([pMatrix])`: Returns the horizontal field-of-view (hfov) in radians.

**Observation:** when no projection (`pMatrix`) matrix is passed the renderer [current value](#matrix-queries) is used instead.

H:

## References

* [Math primer for graphics and game development](https://tfetimes.com/wp-content/uploads/2015/04/F.Dunn-I.Parberry-3D-Math-Primer-for-Graphics-and-Game-Development.pdf)
* [Proscene: A feature-rich framework for interactive environments](https://www.sciencedirect.com/science/article/pii/S235271101730002X?_rdoc=1&_fmt=high&_origin=gateway&_docanchor=&md5=b8429449ccfc9c30159a5f9aeaa92ffb)
* [p5 transformations tutorial](https://www.youtube.com/watch?v=o9sgjuh-CBM)
* [OpenGL projection matrix](http://www.songho.ca/opengl/gl_projectionmatrix.html)
* [The Perspective and Orthographic Projection Matrix](https://www.scratchapixel.com/lessons/3d-basic-rendering/perspective-and-orthographic-projection-matrix)
