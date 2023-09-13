function parseData(data) {
    const positionData = [];
    const normalData = [];

    function addVertex(index) {
        positionData.push(data[index * 8]);
        positionData.push(data[index * 8+1]);
        positionData.push(data[index * 8+2]);
        normalData.push(data[index * 8+3]);
        normalData.push(data[index * 8+4]);
        normalData.push(data[index * 8+5]);
    }

    var face_cnt = data.length / 8, i = 0

    console.log(face_cnt)
    while (i < face_cnt) {
        addVertex(i);
        i = i + 1;
    }

    return {
        positionData: positionData,
        normalData: normalData
    }
}

export { parseData }