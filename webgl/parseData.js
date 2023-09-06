function parseData(model) {
    const positionData = [];
    const normalData = [];

    function addVertex(pos) {
        var positionPos = model.face[pos] - 1, normalPos = model.face[pos + 2] - 1;
        
        positionData.push(model.position[positionPos * 3]);
        positionData.push(model.position[positionPos * 3 + 1]);
        positionData.push(model.position[positionPos * 3 + 2]);
        normalData.push(model.normal[normalPos * 3]);
        normalData.push(model.normal[normalPos * 3 + 1]);
        normalData.push(model.normal[normalPos * 3 + 2]);
    }

    var size = model.face.length, pos = 0;
    while(pos < size) {
        var num_of_vertex = model.face[pos];
        for (let tri = 1; tri < num_of_vertex - 1; tri++) {
            addVertex(pos + 1);
            addVertex(pos + tri * 3 + 1);
            addVertex(pos + (tri + 1) * 3 + 1);
        }
        pos += num_of_vertex * 3 + 1;
    }

    return {
        positionData: positionData,
        normalData: normalData
    }
}

export { parseData }