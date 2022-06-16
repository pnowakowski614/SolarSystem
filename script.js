const namespace = joint.shapes;
const backgroundImage = 'cosmos.jpg';
const initPoint = g.point(850, 480);
 
const createConstraint = (y, radiusX) => {
   constraint = g.ellipse(initPoint, y, radiusX)
   return constraint;
}
 
const earthConstraint = createConstraint(450, 340);
const mercuryConstraint = createConstraint(170, 140);
const venusConstraint = createConstraint(300, 230);
const marsConstraint = createConstraint(600, 440);
 
const ConstraintElementView = joint.dia.ElementView.extend({
   pointerdown: function(evt) {
       const position = this.model.get('position');
       const size = this.model.get('size');
       const center = g.rect(position.x, position.y, size.width, size.height).center();
       const intersection = this.model.attributes.data.constraint.intersectionWithLineFromCenterToPoint(center);
       joint.dia.ElementView.prototype.pointerdown.apply(this, [evt, intersection.x, intersection.y]);
   },
   pointermove: function(evt, x, y) {
       const intersection = this.model.attributes.data.constraint.intersectionWithLineFromCenterToPoint(g.point(x, y));
       joint.dia.ElementView.prototype.pointermove.apply(this, [evt, intersection.x, intersection.y]);
   }
});

const graph = new joint.dia.Graph({}, { cellNamespace: namespace });

const paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: 1830,
    height: 960,
    gridSize: 1,
    elementView: ConstraintElementView,
    background: {
        image: backgroundImage
    },
    cellViewNamespace: namespace
});

const createElement = (positionX, positionY, resize, fillColor, labelText, constraintName) => {
    const circle = new joint.shapes.standard.Circle();
    circle.position(positionX, positionY);
    circle.resize(resize, resize);
    circle.attr({
        body: {
            fill: fillColor
        },
        label: {
            text: labelText,
            fill: 'black'
        }
    });
    circle.prop('data/constraint', constraintName);
    circle.addTo(graph);
    return circle;
 }
  
 const createOrbit = (constraint) => {
    const orbit = V('<ellipse/>');
  
    orbit.attr({
        cx: constraint.x,
        cy: constraint.y,
        rx: constraint.a,
        ry: constraint.b,
        fill: "transparent",
        stroke: "black"
    });
      
    V(paper.viewport).append(orbit);
    return orbit;
 }
  
 const earthOrbit = createOrbit(earthConstraint);
 const mercuryOrbit = createOrbit(mercuryConstraint);
 const venusOrbit = createOrbit(venusConstraint);
 const marsOrbit = createOrbit(marsConstraint);

 const sun = createElement(843, 370, 200, 'yellow', 'Sun', earthConstraint);
 const mercury = createElement(1086, 448, 50, 'gray', 'Mercury', mercuryConstraint);
 const venus = createElement(1174, 428, 85, 'orange', 'Venus', venusConstraint);
 const earth = createElement(1298, 415, 100, 'blue', 'Earth', earthConstraint);
 const mars = createElement(1439, 430, 70, 'red', 'Mars', marsConstraint);