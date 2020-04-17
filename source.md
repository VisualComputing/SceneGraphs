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

H:

## Index

 1. Intro<!-- .element: class="fragment" data-fragment-index="1"-->
    * Active vs pasive transformations
    * Composition
    * Main spaces (missed)
 2. Modelling and view<!-- .element: class="fragment" data-fragment-index="2"-->
 3. Matrix handling in the nub framework<!-- .element: class="fragment" data-fragment-index="3"-->
 4. References<!-- .element: class="fragment" data-fragment-index="4"-->
 
H:

## Intro: Active vs pasive transformations

<font color="yellow"> Active Transformation (standard basis) vs Passive Transformation (change of basis)</font>

<img height='300' src='fig/image3.JPG'/>

N:

* Standard = Canonical

V:

## Intro: Affine transformations composition

Consider the following sequence of transformations:

`$P_1=M_1P,$` <!-- .element: class="fragment" data-fragment-index="1"-->
`$P_2=M_2P_1,$` <!-- .element: class="fragment" data-fragment-index="2"-->
`$...,$` <!-- .element: class="fragment" data-fragment-index="3"-->
`$P_n=M_nP_{n-1}$` <!-- .element: class="fragment" data-fragment-index="4"-->

which is the same as: <!-- .element: class="fragment" data-fragment-index="5"-->
`$P_n=M_n^*P$, where $M_n^*=M_n...M_2M_1$` <!-- .element: class="fragment" data-fragment-index="6"-->

Mnemonic:<!-- .element: class="fragment" data-fragment-index="7"-->
   The (left-to-right) $M_n,...M_2M_1$ transformation sequence is performed respect to a local (mutable) coordinate system

N:

Mnemonic 2: The (right-to-left) $M_1M_2...M_n$ transformation sequence is performed respect to a world (fixed) coordinate system

V:

## Intro: Main spaces

<figure>
    <img height='400' src='fig/coordinate_systems.png'/>
    <figcaption>Matrix transform operations</figcaption>
</figure>

V:

## Intro: Main spaces

<figure>
    <img height='400' src='fig/rendering_pipeline.png'/>
    <figcaption>Opengl Rendering Pipeline</figcaption>
</figure>

N:

1. Virtual camera: vertex specification & vertex shader
2. Shading: fragment shader
3. Visibility (z-buffer): per sample operations

H:

## Modelling and view: Node notion

> Mnemonic: The (left-to-right) $M_n,...M_2M_1$ transformation sequence is performed respect to a local (mutable) coordinate system

A "node" encapsulates a local coordinate system <!-- .element: class="fragment" data-fragment-index="1"-->

V:

## Modelling and view: Node notion

Consider the function `axes()` which draws the X (horizontal) and Y vertical) axes:

```processing
void axes() {
  pushStyle();
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
  popStyle();
}
```

V:

## Modelling and view: Node notion

let's first call the `axes()` function to see what it does:

```processing
void draw() {
  background(50);
  axes();
}
```

<div id='frames1_id'></div>
<!-- .element: class="fragment" data-fragment-index="1"-->

V:

## Modelling and view: Node notion

now let's call it again, but pre-translating it first:

```processing
void draw() {
  background(50);
  axes();
  translate(300, 180);//translation
  axes();//2nd call
}
```

<div id='frames2_id'></div>
<!-- .element: class="fragment" data-fragment-index="1"-->

V:

## Modelling and view: Node notion

let's add a rotation to the second `axes()` call:

```processing
void draw() {
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

## Modelling and view: Node notion

let's do something similar with a third `axes()` call:

```processing
void draw() {
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

## Modelling and view: Node notion

see the result when we animate only the _first_ rotation;

```processing
void draw() {
  background(50);
  axes();
  translate(300, 180);
  rotate(QUARTER_PI/2 * p.frameCount);//animation line
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

## Modelling and view: Node notion

and now see the result when we animate only the _second_ rotation;

```processing
void draw() {
  background(50);
  axes();
  translate(300, 180);
  rotate(QUARTER_PI/2);
  axes();
  translate(260, -180);
  rotate(-QUARTER_PI * p.frameCount);//animation line
  scale(1.5);
  axes();
}
```

<div id='frames6_id'></div>
<!-- .element: class="fragment" data-fragment-index="1"-->

V:

## Modelling and view: Node notion

> A node encapsulates an affine (composed) transform: `$M_i^*, 1 \geq i$` read in left-to-right order (<a href="#/3/1">goto mnemonic 2</a>)

> Note that the `$T(x,y,z) * R_u(\beta) * S(s)$`, `$s > 0$` definition is the one used in [nub](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html)

V:

## Modelling and view: [Scene-graph](https://github.com/VisualComputing/Transformations/blob/gh-pages/sketches/desktop/scenegraph/SceneGraph/SceneGraph.pde)

> A scene-graph is a [directed acyclic graph (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph) of nodes which root is the world coordinate system

V:

## Modelling and view: [Scene-graph](https://github.com/VisualComputing/Transformations/blob/gh-pages/sketches/desktop/scenegraph/SceneGraph/SceneGraph.pde)
### Eyeless example

```processing
 World
  ^
  |
 L1
  ^
  |\
 L2  L3
```

> Scenegraphs are simply and elegantly implemented by means of affine transformations using a matrix stack. See [pushMatrix()](https://processing.org/reference/pushMatrix_.html) and [popMatrix()](https://processing.org/reference/popMatrix_.html)

V:

## Modelling and view: [Scene-graph](https://github.com/VisualComputing/Transformations/blob/gh-pages/sketches/desktop/scenegraph/SceneGraph/SceneGraph.pde)
### Eyeless example

```processing
 World
  ^
  |
 L1
  ^
  |\
 L2  L3
```

```processing
void drawModel() {
  // define a local node L1 (respect to the world)
  pushMatrix(); // saves current matrix transform (I)
  affineTransform1(); // same as: I * affineTransform1()
  drawL1();
  // define a local node L2 respect to L1
  pushMatrix(); // saves current matrix transform (I * affineTransform1())
  affineTransform2(); // same as: I * affineTransform1() * affineTransform2()
  drawL2();
  // "return" to L1
  popMatrix(); // removes the top of the stack, restoring I * affineTransform1()
  // define a local coordinate system L3 respect to L1
  pushMatrix(); // saves current matrix transform (I * affineTransform1())
  affineTransform3(); // same as: I * affineTransform1() * affineTransform3()
  drawL3();
  // return to L1
  popMatrix(); // removes the top of the stack, restoring I * affineTransform1()
  // return to World
  popMatrix(); // removes the top of the stack, restoring I
}
```
<!-- .element: class="fragment" data-fragment-index="1"-->

V:

## Modelling and view: [Scene-graph](https://github.com/VisualComputing/Transformations/blob/gh-pages/sketches/desktop/scenegraph/SceneGraph/SceneGraph.pde)
### Eyeless example

<div id='scene-graph_id'></div>

V:

## Modelling and view: [Scene-graph](https://github.com/VisualComputing/Transformations/blob/gh-pages/sketches/desktop/scenegraph/SceneGraph/SceneGraph.pde)
### View transform (eye-node)

```processing
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
### [View](https://github.com/VisualComputing/Transformations/blob/gh-pages/sketches/desktop/scenegraph/MiniMap/MiniMap.pde) example

```processing
 World
  ^
  |\
 L1 Eye
  ^
  |\
 L2  L3
```

```processing
void draw() {
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
### [View](https://github.com/VisualComputing/Transformations/blob/gh-pages/sketches/desktop/scenegraph/MiniMap/MiniMap.pde) example

<div id='minimap_id'></div>

V:

## Modelling and view in [nub](https://visualcomputing.github.io/nub-javadocs/)
### [Node](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html) trees

```processing
 World
  ^
  |\
 n1 eye
  ^
  |\
 n2  n3
```

```processing
Scene scene;
Node n1, n2, n3;
void setup() {
  scene = new Scene(this);
  // Create a top-level (shapeless) node (i.e., a node whose reference is null) with:
  n1 = new Node();
  // whereas for the remaining nodes we pass any constructor taking a
  // reference node parameter, such as Node(Node referenceNode)
  n2 = new Node(n1) {
    // Immediate rendering mode
    @Override
    public void graphics(PGraphics pg) {
      Scene.drawTorusSolenoid(pg);
    }
  };
  // Retained rendering mode
  n3 = new Node(n1, createShape(BOX, 60));
}
```

> Check [immediate](https://en.wikipedia.org/wiki/Immediate_mode_(computer_graphics%29) and [retained](https://en.wikipedia.org/wiki/Retained_mode) rendering modes

V:

## Modelling and view in [nub](https://visualcomputing.github.io/nub-javadocs/)
### [Node](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html) manual traversals

```processing
 World
  ^
  |\
 n1 eye
  ^
  |\
 n2  n3
```

```processing
void draw() {
  // enter n1
  pushMatrix();
  scene.applyTransformation(n1);
  scene.draw(n1);
  // enter n2
  pushMatrix();
  scene.applyTransformation(n1);
  scene.draw(n2);
  // "return" to n1
  popMatrix();
  // enter n3
  pushMatrix();
  scene.applyTransformation(n3);
  scene.draw(n3);
  // return to n1
  popMatrix();
  // return to World
  popMatrix();
}
```

V:

## Modelling and view in [nub](https://visualcomputing.github.io/nub-javadocs/)
### [Node](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html) automatic traversals

```processing
 World
  ^
  |\
 n1 eye
  ^
  |\
 n2  n3
```

```processing
void draw() {
  scene.render();
}
```

V:

## Modelling and view in [nub](https://visualcomputing.github.io/nub-javadocs/)
### Using [nodes](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html)
#### Advantages

<li class="fragment"> The scene gets automatically rendered respect to the `eye` node
<li class="fragment"> The graph topology is set (even at run time) with [setReference(node)](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html#setReference-nub.core.Node-).
<li class="fragment"> Nodes may be picked using ray-casting and the scene provides all sorts of interactivity commands to manipulate them.
<li class="fragment"> [setTranslation(Vector)](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html#setTranslation-nub.primitives.Vector-), [translate(Vector)](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html#translate-nub.primitives.Vector-), [setRotation(Quaternion)](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html#setRotation-nub.primitives.Quaternion-), [rotate(Quaternion)](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html#rotate-nub.primitives.Quaternion-), [setScaling(float)](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html#setScaling-float-) and [scale(float)](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html#scale-float-), locally manipulates a node instance

V:

## Modelling and view in [nub](https://visualcomputing.github.io/nub-javadocs/)
### Using [nodes](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html)
#### Advantages

<li class="fragment"> [setPosition(Vector)](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html#setPosition-nub.primitives.Vector-), [setOrientation(Quaternion)](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html#setOrientation-nub.primitives.Quaternion-), and [setMagnitude(float)](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html#setMagnitude-float-), globally manipulates node instances
<li class="fragment"> (the node methods) [location(Vector, Node)](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html#location-nub.primitives.Vector-nub.core.Node-) and [displacement(Vector, Node)](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html#displacement-nub.primitives.Vector-nub.core.Node-) transforms coordinates and vectors (resp.) from other node instances
<li class="fragment"> (the node methods) [worldLocation(Vector)](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html#worldLocation-nub.primitives.Vector-) and [worldDisplacement(Vector)](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html#worldDisplacement-nub.primitives.Vector-) transforms node coordinates and vectors (resp.) to the world
<li class="fragment"> (the graph methods) [location(vector, node)](https://visualcomputing.github.io/nub-javadocs/nub/core/Graph.html#location-nub.primitives.Vector-nub.core.Node-) and [screenLocation(vector, node)](https://visualcomputing.github.io/nub-javadocs/nub/core/Graph.html#screenLocation-nub.primitives.Vector-nub.core.Node-) transforms coordinates between node and screen space
<li class="fragment"> [setConstraint(Constrain)](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html#setConstraint-nub.core.constraint.Constraint-) applies a [Constraint](https://visualcomputing.github.io/nub-javadocs/nub/primitives/constraint/Constraint.html) to a node instance limiting its motion

H:

## Matrix handling in [nub](https://visualcomputing.github.io/nub-javadocs/)
### Geometry data mapping

* The _model_ matrix (`$M$`) maps from (object) <a href="#/6/8">node</a> space to world space
* The <a href="#/6/13">view</a> matrix (`$V$`) maps from world space to eye space
* The _projection_ (`$P$`) matrix maps from eye space to <a href="#/7">clip space</a>

> Composing all three, i.e.,  `$P * V * M$`, would thus map from object space to clip space

V:

## Matrix handling in [nub](https://visualcomputing.github.io/nub-javadocs/)
### Matrix stack naming conventions

1. <a href="#/6/11">When the bottom of the matrix stack is filled with the identity matrix</a> (`$I$`), its top is referred to as the _model_ matrix
2. <a href="#/6/16">When the bottom of the matrix stack is filled with the view matrix</a> (`$V$`), its top is referred to as the _modelview_ matrix

V:

## Matrix handling in [nub](https://visualcomputing.github.io/nub-javadocs/)
### Main methods to retrieve the node matrices

* Use [worldMatrix()](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html#worldMatrix--) to retrieve the node _model_ matrix
* Use [view()](https://visualcomputing.github.io/nub-javadocs/nub/core/Node.html#view--) to retrieve the node _view_ matrix.

V:

## Matrix handling in [nub](https://visualcomputing.github.io/nub-javadocs/)
### Main methods to retrieve the scene cached matrices

* Use [projection()](https://visualcomputing.github.io/nub-javadocs/nub/core/Graph.html#projection--) to retrieve the cached _projection_ matrix computed with the scene [eye()](https://visualcomputing.github.io/nub-javadocs/nub/core/Graph.html#eye--).
* Use [view()](https://visualcomputing.github.io/nub-javadocs/nub/core/Graph.html#view--) to retrieve the cached _view_ matrix computed with the scene [eye()](https://visualcomputing.github.io/nub-javadocs/nub/core/Graph.html#eye--).
* Use [projectionView()](https://visualcomputing.github.io/nub-javadocs/nub/core/Graph.html#projectionView--) to retrieve the cached _projection_ times _view_ matrix.
* Use [projectionViewInverse()](https://visualcomputing.github.io/nub-javadocs/nub/core/Graph.html#projectionViewInverse--) to retrieve the cached _projection_ times _view_ inverse matrix (requires to call [cacheProjectionViewInverse()](https://visualcomputing.github.io/nub-javadocs/nub/core/Graph.html#cacheProjectionViewInverse-boolean-) first).

V:

## Matrix handling in [nub](https://visualcomputing.github.io/nub-javadocs/)
### Main methods to retrieve the scene projection matrices

* Use [projection(type, width, height, zNear, zFar)](https://visualcomputing.github.io/nub-javadocs/nub/processing/Scene.html#projection-nub.core.Node-nub.core.Graph.Type-float-float-float-float-) to retrieve the node _projection_ matrix.
    * Use [orthographic(width, height, zNear, zFar)](https://visualcomputing.github.io/nub-javadocs/nub/processing/Scene.html#orthographic-nub.core.Node-float-float-float-float-) to retrieve the _orthographic_ matrix.
    * Use [perspective(aspectRatio, zNear, zFar)](https://visualcomputing.github.io/nub-javadocs/nub/processing/Scene.html#perspective-nub.core.Node-float-float-float-) to retrieve the _perspective_ matrix.

H:

## References

* [Math primer for graphics and game development](https://tfetimes.com/wp-content/uploads/2015/04/F.Dunn-I.Parberry-3D-Math-Primer-for-Graphics-and-Game-Development.pdf)
* [Proscene: A feature-rich framework for interactive environments](https://www.sciencedirect.com/science/article/pii/S235271101730002X?_rdoc=1&_fmt=high&_origin=gateway&_docanchor=&md5=b8429449ccfc9c30159a5f9aeaa92ffb)
* [Processing 2d transformations tutorial](https://www.processing.org/tutorials/transform2d/)
* [OpenGL projection matrix](http://www.songho.ca/opengl/gl_projectionmatrix.html)
* [The Perspective and Orthographic Projection Matrix](https://www.scratchapixel.com/lessons/3d-basic-rendering/perspective-and-orthographic-projection-matrix)