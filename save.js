function parseData(model) {
    const positionData = [];
    const normalData = [];

    function addVertex(part) {
        const ptn = part.split('/');
        var len = ptn.length;
        var positionPos = parseInt(ptn[0]), normalPos = parseInt(ptn[len - 1]);
        positionPos -= 1;
        normalPos -= 1;
        positionData.push(model.position[positionPos * 3]);
        positionData.push(model.position[positionPos * 3 + 1]);
        positionData.push(model.position[positionPos * 3 + 2]);
        normalData.push(model.normal[normalPos * 3]);
        normalData.push(model.normal[normalPos * 3 + 1]);
        normalData.push(model.normal[normalPos * 3 + 2]);
    }

    for (let i = 0; i < model.face_str.length; i++) {
        const parts = model.face_str[i].trim().split(' ');  //parts[0]是f
        for (let tri = 1; tri < parts.length - 2; tri++) {
            addVertex(parts[1]);
            addVertex(parts[tri + 1]);
            addVertex(parts[tri + 2]);
        }
    }

    return {
        positionData: positionData,
        normalData: normalData
    }
}

export { parseData }