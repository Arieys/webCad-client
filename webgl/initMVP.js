function initMVP(gl, positionData) {
    function getExtents(positions) {
        const min = positions.slice(0, 3);
        const max = positions.slice(0, 3);
        for (let i = 3; i < positions.length; i += 3) {
            for (let j = 0; j < 3; ++j) {
                const v = positions[i + j];
                min[j] = Math.min(v, min[j]);
                max[j] = Math.max(v, max[j]);
            }
        }
        return { min, max };
    }

    const minMax = getExtents(positionData);
    var min = Array(3).fill(Number.POSITIVE_INFINITY);
    var max = Array(3).fill(Number.NEGATIVE_INFINITY);
    min = min.map((min, ndx) => Math.min(minMax.min[ndx], min));
    max = max.map((max, ndx) => Math.max(minMax.max[ndx], max));

    let range = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    let objOffset = [range[0] * 0.5, range[1] * 0.5, range[2] * 0.5];
    objOffset = [min[0] + objOffset[0], min[1] + objOffset[1], min[2] + objOffset[2]];
    objOffset = [-objOffset[0], -objOffset[1], -objOffset[2]];
    const modelMatrix = mat4.create();
    mat4.translate(
        modelMatrix,
        modelMatrix,
        objOffset
    );

    const radius = Math.sqrt(range[0] * range[0] + range[1] * range[1] + range[2] * range[2]) * 1.2;
    const zNear = radius / 100;
    const zFar = radius * 3;
    const fieldOfViewRadians = 60 * Math.PI / 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, fieldOfViewRadians, aspect, zNear, zFar);

    

    const viewMatrix = mat4.create();
    mat4.translate(
        viewMatrix,
        viewMatrix,
        [0, 0, -radius]
    );

    return {
        modelMatrix: modelMatrix,
        viewMatrix: viewMatrix,
        projectionMatrix: projectionMatrix,
        cameraZPosition: radius
    }
}

function initSimpleMVP(gl) {
    const modelMatrix = mat4.create();

    const zNear = 0.1;
    const zFar = 1000;
    const fieldOfViewRadians = 45 * Math.PI / 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, fieldOfViewRadians, aspect, zNear, zFar);


    const viewMatrix = mat4.create();
    mat4.translate(
        viewMatrix,
        viewMatrix,
        [0, 0, -5]
    );

    return {
        modelMatrix: modelMatrix,
        viewMatrix: viewMatrix,
        projectionMatrix: projectionMatrix,
        cameraZPosition: 5
    }
}

export { initMVP, initSimpleMVP }