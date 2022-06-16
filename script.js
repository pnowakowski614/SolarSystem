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
 const mercury = createElement(1086, 448, 50, 'gray', 'Mercury');
 const venus = createElement(1174, 428, 85, 'orange', 'Venus');
 const earth = createElement(1298, 415, 100, 'blue', 'Earth');
 const mars = createElement(1439, 430, 70, 'red', 'Mars');