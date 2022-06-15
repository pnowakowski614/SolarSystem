const namespace = joint.shapes;

const graph = new joint.dia.Graph({}, { cellNamespace: namespace });

const paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: 1830,
    height: 960,
    gridSize: 1,
    background: {
        color: 'gray'
    },
    cellViewNamespace: namespace
});
