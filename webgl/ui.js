function onClickCreateBlcok() {

    console.log("on createBlock btn click");
    var x = document.getElementById('block_x').value;
    var y = document.getElementById('block_y').value;
    var z = document.getElementById('block_z').value;


    const data = {
        x: x,
        y: y,
        z: z
    };

    console.log(x, y, z);

    // 发送请求到后端的路由  
    fetch('/createBlock', {
        method: 'POST', // 或者使用 GET 方法  
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const parsedData = parseData(data.mesh_data);

            setPositionData(parsedData.positionData);
            setNormalData(parsedData.normalData)
            console.log("setDataSuccessfully")
            // 处理从后端返回的数据  
            // ...  
        })
        .catch(error => {
            console.error(error)
            // 处理错误  
            // ...  
        });
}

function onClickCreateCone() {

    console.log("on createCone btn click");
    var radius = document.getElementById('cone_radius').value;
    var height = document.getElementById('cone_height').value;
    var semiAngle = document.getElementById('cone_semiAngle').value;


    const data = {
        radius: radius,
        height: height,
        semiAngle: semiAngle
    };

    // 发送请求到后端的路由  
    fetch('/createCone', {
        method: 'POST', // 或者使用 GET 方法  
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const parsedData = parseData(data.mesh_data);

            setPositionData(parsedData.positionData);
            setNormalData(parsedData.normalData)
            console.log("setDataSuccessfully")
            // 处理从后端返回的数据  
            // ...  
        })
        .catch(error => {
            console.error(error)
            // 处理错误  
            // ...  
        });
}

function onClickCreateSphere() {

    console.log("on createSphere btn click");
    var radius = document.getElementById('sphere_radius').value;

    const data = {
        radius: radius,
    };

    // 发送请求到后端的路由  
    fetch('/createSphere', {
        method: 'POST', // 或者使用 GET 方法  
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const parsedData = parseData(data.mesh_data);

            setPositionData(parsedData.positionData);
            setNormalData(parsedData.normalData)
            console.log("setDataSuccessfully")
            // 处理从后端返回的数据  
            // ...  
        })
        .catch(error => {
            console.error(error)
            // 处理错误  
            // ...  
        });
}

function onClickCreateCylinder() {

    console.log("on createCylinder btn click");
    var radius = document.getElementById('cylinder_radius').value;
    var height = document.getElementById('cylinder_height').value;

    const data = {
        radius: radius,
        height: height,
    };

    // 发送请求到后端的路由  
    fetch('/createCylinder', {
        method: 'POST', // 或者使用 GET 方法  
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const parsedData = parseData(data.mesh_data);

            setPositionData(parsedData.positionData);
            setNormalData(parsedData.normalData)
            console.log("setDataSuccessfully")
            // 处理从后端返回的数据  
            // ...  
        })
        .catch(error => {
            console.error(error)
            // 处理错误  
            // ...  
        });
}

function onClickCreateTorus() {

    console.log("on createTorus btn click");
    var majorRadius = document.getElementById('torus_major_radius').value;
    var minorRadius = document.getElementById('torus_minor_radius').value;


    const data = {
        majorRadius: majorRadius,
        minorRadius: minorRadius,
    };

    // 发送请求到后端的路由  
    fetch('/createTorus', {
        method: 'POST', // 或者使用 GET 方法  
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const parsedData = parseData(data.mesh_data);

            setPositionData(parsedData.positionData);
            setNormalData(parsedData.normalData)
            console.log("setDataSuccessfully")
            // 处理从后端返回的数据  
            // ...  
        })
        .catch(error => {
            console.error(error)
            // 处理错误  
            // ...  
        });
}

function onClickCreatePrism() {

    console.log("on createPrism btn click");
    var radius = document.getElementById('prism_radius').value;
    var height = document.getElementById('prism_height').value;
    var nSide = document.getElementById('prism_nside').value;


    const data = {
        radius: radius,
        height: height,
        nSide: nSide
    };

    // 发送请求到后端的路由  
    fetch('/createPrism', {
        method: 'POST', // 或者使用 GET 方法  
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const parsedData = parseData(data.mesh_data);

            setPositionData(parsedData.positionData);
            setNormalData(parsedData.normalData)
            console.log("setDataSuccessfully")
            // 处理从后端返回的数据  
            // ...  
        })
        .catch(error => {
            console.error(error)
            // 处理错误  
            // ...  
        });
}

export { onClickCreateBlcok, onClickCreateCone, onClickCreateSphere, onClickCreateTorus, onClickCreateCylinder, onClickCreatePrism }