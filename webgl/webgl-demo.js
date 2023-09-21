import { initPositionBuffer, initColornBuffer, initNormalBuffer } from "./initBuffer.js";
import { drawObject } from "./drawObject.js";
import { initSimpleMVP } from "./initMVP.js";
import { createCamera, getViewMatrix, processMouseMovement } from "./camera.js";
import * as ui from "./ui.js";
import { addModel, models } from "./dataBuffer.js";
import { parseData } from "./parseData.js";

let deltaTime = 0;
let MVP = {
    modelMatrix: mat4.create(),
    viewMatrix: mat4.create(),
    projectionMatrix: mat4.create()
};
let camera = createCamera(0.0, 0.0, 0.0);
let speed = 0.02;

const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    uniform mat4 uModelMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying lowp vec3 vPosition;
    varying lowp vec3 vNormal;
    void main(void) {
      gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aVertexPosition;
      vPosition = vec3(uModelMatrix * aVertexPosition);
      vNormal = aVertexNormal;
    }
  `;

const fsSource = `
    precision mediump float;

    varying lowp vec3 vPosition;
    varying lowp vec3 vNormal;
    uniform vec3 lightPosition;
    void main(void) {
      vec3 lightColor = vec3(1.0);

      float ambientStrength = 0.3;
      vec3 ambient = ambientStrength * lightColor;

      vec3 normal = normalize(vNormal);
      vec3 lightDirection = normalize(lightPosition - vPosition);
      float diffuseStrength = max(dot(normal, lightDirection), 0.0) * (1.0 - ambientStrength);
      vec3 diffuse = diffuseStrength * lightColor;

      vec3 color = ambient + diffuse;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

let clientStatus = 0;
function pollData() {
    console.log("pollData")
    const data = {
        clientStatus: clientStatus
    };
    // 发送请求到后端的路由  
    fetch('/queryScene', {
        method: 'POST', // 或者使用 GET 方法  
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.models == "") {
                console.log("data empty");
            }
            else {
                console.log(data.models.length)
                for (var i = 0; i < data.models.length; i++) {
                    const parsedData = parseData(data.models[i].faceVertices);
                    addModel(parsedData);
                }
                console.log("setDataSuccessfully, status = ", data.status);
                clientStatus = data.status
            }
            setTimeout(pollData, 1000); // 1秒后再次执行轮询  
        })
        .catch(error => {
            console.error(error)
            // 处理错误  
            // ...  
        });

}


main();

function main() {
    pollData();  

    const canvas = document.querySelector("#glcanvas");
    const gl = canvas.getContext("webgl");

    if (gl === null) {
    alert(
        "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
    }

    gl.clearColor(1.0, 1.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

  
    var start = new Date();
    console.log(start);

    var initialMVP = initSimpleMVP(gl);
    MVP = {
    modelMatrix: initialMVP.modelMatrix,
    viewMatrix: initialMVP.viewMatrix,
    projectionMatrix: initialMVP.projectionMatrix
    };
    camera = createCamera(0.0, 0.0, initialMVP.cameraZPosition);
  

    //创建entity按钮监听
    const createBlockBtn = document.getElementById("createBlock");
    const createConeBtn = document.getElementById("createCone");
    const createSphereBtn = document.getElementById("createSphere");
    const createCylinderBtn = document.getElementById("createCylinder");
    const createTorusBtn = document.getElementById("createTorus");
    const createPrismBtn = document.getElementById("createPrism");
    createBlockBtn.addEventListener("click", ui.onClickCreateBlcok);
    createConeBtn.addEventListener("click", ui.onClickCreateCone);
    createSphereBtn.addEventListener("click", ui.onClickCreateSphere);
    createCylinderBtn.addEventListener("click", ui.onClickCreateCylinder);
    createTorusBtn.addEventListener("click", ui.onClickCreateTorus);
    createPrismBtn.addEventListener("click", ui.onClickCreatePrism);

    //设置鼠标事件监听
    var dragging = false;
    var last_x, last_y;
    canvas.onmousedown = function (event) {
        dragging = true;
        last_x = event.clientX;
        last_y = event.clientY;
    }

    canvas.onmouseup = function (event) {
        dragging = false;
    }

    canvas.onmousemove = function (event) {
        var current_x = event.clientX, current_y = event.clientY;
        if (dragging) {
            var xoffset = current_x - last_x, yoffset = current_y - last_y;
            xoffset *= 0.01;
            yoffset *= -0.01;
            last_x = current_x;
            last_y = current_y;
            processMouseMovement(camera, xoffset, yoffset);
            MVP.viewMatrix = getViewMatrix(camera);
        }
    }

  //设置键盘事件监听
    document.onkeypress = function (event) {
    if (event.key == "w") {
      camera.position = [camera.position[0] + camera.front[0] * speed, camera.position[1] + camera.front[1] * speed, camera.position[2] + camera.front[2] * speed];
      MVP.viewMatrix = getViewMatrix(camera);
    }
    if (event.key == "s") {
      camera.position = [camera.position[0] - camera.front[0] * speed, camera.position[1] - camera.front[1] * speed, camera.position[2] - camera.front[2] * speed];
      MVP.viewMatrix = getViewMatrix(camera);
    }
    if (event.key == "a") {
      var crossMatrix = [camera.up[1] * camera.front[2] - camera.front[1] * camera.up[2],
      camera.front[0] * camera.up[2] - camera.up[0] * camera.front[2],
      camera.up[0] * camera.front[1] - camera.front[0] * camera.up[1]];
      var len = Math.sqrt(crossMatrix[0] * crossMatrix[0] + crossMatrix[1] * crossMatrix[1] + crossMatrix[2] * crossMatrix[2]);
      crossMatrix = [crossMatrix[0] / len, crossMatrix[1] / len, crossMatrix[2] / len];
      camera.position = [camera.position[0] + crossMatrix[0] * speed, camera.position[1] + crossMatrix[1] * speed, camera.position[2] + crossMatrix[2] * speed];
      MVP.viewMatrix = getViewMatrix(camera);
    }
    if (event.key == "d") {
      var crossMatrix = [camera.up[1] * camera.front[2] - camera.front[1] * camera.up[2],
      camera.front[0] * camera.up[2] - camera.up[0] * camera.front[2],
      camera.up[0] * camera.front[1] - camera.front[0] * camera.up[1]];
      var len = Math.sqrt(crossMatrix[0] * crossMatrix[0] + crossMatrix[1] * crossMatrix[1] + crossMatrix[2] * crossMatrix[2]);
      crossMatrix = [crossMatrix[0] / len, crossMatrix[1] / len, crossMatrix[2] / len];
      camera.position = [camera.position[0] - crossMatrix[0] * speed, camera.position[1] - crossMatrix[1] * speed, camera.position[2] - crossMatrix[2] * speed];
      MVP.viewMatrix = getViewMatrix(camera);
    }
  }

    const shaderProgram = createShaderProgram(gl, vsSource, fsSource);

    const locationInfo = {
    program: shaderProgram,
    attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        vertexNormal: gl.getAttribLocation(shaderProgram, "aVertexNormal"),
    },
    uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
        modelMatrix: gl.getUniformLocation(shaderProgram, "uModelMatrix"),
        viewMatrix: gl.getUniformLocation(shaderProgram, "uViewMatrix"),
        lightPosition: gl.getUniformLocation(shaderProgram, "lightPosition"),
    },
    };

    let then = 0;


    function render(now) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
        gl.clearDepth(1.0); // Clear everything
        gl.enable(gl.DEPTH_TEST); // Enable depth testing
        gl.depthFunc(gl.LEQUAL); // Near things obscure far things

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the canvas before we start drawing on it.

        now *= 0.001; // convert to seconds
        deltaTime = now - then;
        then = now;

        for (var i = 0; i < models.length; i++) {
            const Buffers = {
                positionBuffer: initPositionBuffer(gl, models[i].positionData),
                normalBuffer: initNormalBuffer(gl, models[i].normalData),
            }
            const vertexCount = models[i].positionData.length / 3;

            drawObject(gl, locationInfo, Buffers, vertexCount, MVP, camera.position);
        }

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

function createShaderProgram(gl, vsSource, fsSource) {
    function loadShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(
            `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
            );
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert(
            `Unable to initialize the shader program: ${gl.getProgramInfoLog(
            shaderProgram
            )}`
        );
        return null;
    }

    return shaderProgram;
}