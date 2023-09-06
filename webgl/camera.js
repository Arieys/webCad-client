// yaw: 偏航角，以x轴正方向为起点向z轴正方向旋转， pitch: 俯仰角，与y轴正负方向相同
// 默认初始时朝z轴负方向看并以y轴正方向为向上方向
function createCamera(x, y, z) {
    var position = [x, y, z];
    var front = [0.0, 0.0, -1.0];
    var up = [0.0, 1.0, 0.0];
    return {
        position: position,
        yaw: 1.5 * Math.PI,
        pitch: 0,
        front: front,
        up: up,
    }
}

function getViewMatrix(camera) {
    var viewMatrix = mat4.create();
    var lookAtPosition = [camera.position[0]+camera.front[0], camera.position[1]+camera.front[1], camera.position[2]+camera.front[2]];
    mat4.lookAt(viewMatrix, camera.position, lookAtPosition, camera.up);
    return viewMatrix;
}

function processMouseMovement(camera, xoffset, yoffset) {
    function updateFront(camera) {
        camera.front[0] = Math.cos(camera.pitch) * Math.cos(camera.yaw);
        camera.front[1] = Math.sin(camera.pitch);
        camera.front[2] = Math.cos(camera.pitch) * Math.sin(camera.yaw);
    }

    camera.yaw += xoffset;
    if(camera.pitch+yoffset>=-0.5*Math.PI && camera.pitch+yoffset<=0.5*Math.PI) {
        camera.pitch += yoffset;
    }
    updateFront(camera);
}

export { createCamera, getViewMatrix, processMouseMovement }