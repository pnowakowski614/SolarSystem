const namespace = joint.shapes;
const backgroundImage = 'cosmos.jpg';

const graph = new joint.dia.Graph({}, { cellNamespace: namespace });

const paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: 1830,
    height: 960,
    gridSize: 1,
    background: {
        image: backgroundImage
    },
    cellViewNamespace: namespace
});

const createElement = (positionX, positionY, resize, fillColor, labelText) => {
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
    circle.addTo(graph);
    return circle;
 }
  
 const sun = createElement(843, 370, 200, 'yellow', 'Sun');
 const mercury = createElement(100, 100, 50, 'red', 'Mercury');