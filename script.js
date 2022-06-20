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
   width: 1848,
   height: 980,
   gridSize: 1,
   elementView: ConstraintElementView,
   interactive: function(elementView) {
       if (elementView.model.attributes.data.status === false){
           return {elementMove: false};
       }
       else return true;
   },
   background: {
       image: backgroundImage
   },
   cellViewNamespace: namespace
});
 
const createElement = (customPosition, resize, fillColor, labelText, canMove, constraintName) => {
   const circle = new joint.shapes.standard.Circle({
       position: customPosition,
       size: {width: resize, height: resize},
       attrs: {
           body: {
               fill: fillColor
           },
           label: {
               text: labelText,
               fill: 'black'
           },
       }
   })
   circle.prop('data/status', canMove);
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
 
const initPositions = (constraint, orbitPointX, orbitPointY, offsetX, offsetY) => {
    const position = constraint.intersectionWithLineFromCenterToPoint(g.point(orbitPointX, orbitPointY)).offset(offsetX, offsetY)
    return position;
 }
const earthOrbit = createOrbit(earthConstraint);
const mercuryOrbit = createOrbit(mercuryConstraint);
const venusOrbit = createOrbit(venusConstraint);
const marsOrbit = createOrbit(marsConstraint);
 
const sun = createElement({x: 750, y: 380}, 200, 'yellow', 'Sun', false, earthConstraint);
const mercury = createElement(initPositions(mercuryConstraint, 300, 300, -40, -10), 50, 'gray', 'Mercury', true, mercuryConstraint);
const venus = createElement(initPositions(venusConstraint, 1500, 1500, -40, -50), 85, 'orange', 'Venus', true, venusConstraint);
const earth = createElement(initPositions(earthConstraint, 100, 100, -40, -50), 100, 'blue', 'Earth', true, earthConstraint);
const mars = createElement(initPositions(marsConstraint, 700, 1000, -40, -30), 70, 'red', 'Mars', true, marsConstraint);

paper.on('element:pointerclick', function(elementView) {
    joint.ui.Inspector.create('#inspector-container', {
        cell: elementView.model,
        inputs: {
            'attrs/label/text': {
                type: 'text',
                label: 'Name',
                index: 1
            },
            'attrs/body/fill': {
                type: 'color-palette',
                options: [
                    { content: '#FFFFFF' },
                    { content: '#FF0000' },
                    { content: '#00FF00' },
                    { content: '#0000FF' },
                    { content: '#000000' }
                ],
                label: 'Fill color',
                index: 2
            },
            'attrs/label/fill': {
                type: 'color-palette',
                options: [
                    { content: '#FFFFFF' },
                    { content: '#FF0000' },
                    { content: '#00FF00' },
                    { content: '#0000FF' },
                    { content: '#000000' }
                ],
                label: 'Label color',
                index: 3
            },
            'attrs/body/stroke': {
                type: 'color-palette',
                options: [
                    { content: '#FFFFFF' },
                    { content: '#FF0000' },
                    { content: '#00FF00' },
                    { content: '#0000FF' },
                    { content: '#000000' }
                ],
                label: 'Border color',
                index: 4
            },
            'attrs/body/stroke-width': {
                type: 'range',
                min: 0,
                max: 50,
                unit: 'px',
                label: 'Border width',
                index: 5
            }
        }
    });
 });

const stencil = new joint.ui.Stencil({
    paper: paper,
    width: 240,
    groups: {
        planets: { index: 1, label: 'Planets' },
    },
    layout: {
        columnWidth: 240,
        columns: 1,
        rowHeight: 100,
    },
    dropAnimation: true,
 });
  
document.querySelector('#stencil-container').appendChild(stencil.el);
 stencil.render().load({
    planets: [earth.clone(), mercury.clone(), mars.clone(), venus.clone()]
 });
 