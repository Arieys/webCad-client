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

    // �������󵽺�˵�·��  
    fetch('/createBlock', {
        method: 'POST', // ����ʹ�� GET ����  
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
            // ����Ӻ�˷��ص�����  
            // ...  
        })
        .catch(error => {
            console.error(error)
            // �������  
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

    // �������󵽺�˵�·��  
    fetch('/createCone', {
        method: 'POST', // ����ʹ�� GET ����  
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
            // ����Ӻ�˷��ص�����  
            // ...  
        })
        .catch(error => {
            console.error(error)
            // �������  
            // ...  
        });
}

function onClickCreateSphere() {

    console.log("on createSphere btn click");
    var radius = document.getElementById('sphere_radius').value;

    const data = {
        radius: radius,
    };

    // �������󵽺�˵�·��  
    fetch('/createSphere', {
        method: 'POST', // ����ʹ�� GET ����  
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
            // ����Ӻ�˷��ص�����  
            // ...  
        })
        .catch(error => {
            console.error(error)
            // �������  
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

    // �������󵽺�˵�·��  
    fetch('/createCylinder', {
        method: 'POST', // ����ʹ�� GET ����  
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
            // ����Ӻ�˷��ص�����  
            // ...  
        })
        .catch(error => {
            console.error(error)
            // �������  
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

    // �������󵽺�˵�·��  
    fetch('/createTorus', {
        method: 'POST', // ����ʹ�� GET ����  
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
            // ����Ӻ�˷��ص�����  
            // ...  
        })
        .catch(error => {
            console.error(error)
            // �������  
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

    // �������󵽺�˵�·��  
    fetch('/createPrism', {
        method: 'POST', // ����ʹ�� GET ����  
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
            // ����Ӻ�˷��ص�����  
            // ...  
        })
        .catch(error => {
            console.error(error)
            // �������  
            // ...  
        });
}

export { onClickCreateBlcok, onClickCreateCone, onClickCreateSphere, onClickCreateTorus, onClickCreateCylinder, onClickCreatePrism }