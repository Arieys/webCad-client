const ejs = require('ejs');
const express = require('express');
const app = express();

const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.join(__dirname, 'cloudCAD.proto');
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const cad_proto = protoDescriptor.CloudCAD;
const ModelService = cad_proto.CADmodeling;

// 创建客户端
const client = new ModelService('localhost:50052', grpc.credentials.createInsecure());
// 构造请求消息
var clientStatus = 0;
// 调用服务

var models;

client.sayHello({ name: 'Hello ys' }, function (err, response) {
    if (err) {
        console.error('Error: ', err)
    } else {
        console.log(response.message)
    }
})

app.use(express.static('webgl', { 'extensions': ['js', 'css'] }));

// 在模板中动态传递参数
app.get('/', function (req, res) {
  console.log("start loading website");
  const params = {
  };
  ejs.renderFile('index.ejs', params, function (err, str) {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(str);
    }
  });
});

app.use(express.json());

app.post('/createBlock', (req, res) => {

    // input parameter not empty
    if (req.body.x != "" && req.body.y != "" && req.body.z != "") {
        client.createBlock({ xsize: req.body.x, ysize: req.body.y, zsize: req.body.z }, function (err, response) {
            if (err) {
                console.error('Error: ', err)
            } else {
                console.log("create block success")
            }
        })
    }
    else {
        console.log("input empty");
    }

});  

app.post('/createCone', (req, res) => {

    // input parameter not empty
    if (req.body.radius != "" && req.body.height != "" && req.body.semiAngle != "") {
        client.createCone({ radius: req.body.radius, height: req.body.height, semiAngle: req.body.semiAngle }, function (err, response) {
            if (err) {
                console.error('Error: ', err)
            } else {
                console.log("create cone success")
            }
        })
    }
    else {
        console.log("input empty");
    }

});  

app.post('/createSphere', (req, res) => {

    // input parameter not empty
    if (req.body.radius != "") {
        client.createSphere({ radius: req.body.radius}, function (err, response) {
            if (err) {
                console.error('Error: ', err)
            } else {
                console.log("create sphere success")
            }
        })
    }
    else {
        console.log("input empty");
    }

});

app.post('/createCylinder', (req, res) => {

    // input parameter not empty
    if (req.body.radius != "" && req.body.height != "") {
        client.createCylinder({ radius: req.body.radius, height: req.body.height}, function (err, response) {
            if (err) {
                console.error('Error: ', err)
            } else {
                console.log("create cylinder success")
            }
        })
    }
    else {
        console.log("input empty");
    }

});

app.post('/createTorus', (req, res) => {

    // input parameter not empty
    if (req.body.majorRadius != "" && req.body.minorRadius != "") {
        client.createTorus({ major_radius: req.body.majorRadius, minor_radius: req.body.minorRadius}, function (err, response) {
            if (err) {
                console.error('Error: ', err)
            } else {
                console.log("create torus success")
            }
        })
    }
    else {
        console.log("input empty");
    }

});

app.post('/createPrism', (req, res) => {

    // input parameter not empty
    if (req.body.radius != "" && req.body.height != "" && req.body.nSide != "") {
        client.createPrism({ radius: req.body.radius, height: req.body.height, nSide: req.body.nSide }, function (err, response) {
            if (err) {
                console.error('Error: ', err)
            } else {
                console.log("create prism success")
            }
        })
    }
    else {
        console.log("input empty");
    }

});

app.post('/queryScene', (req, res) => {

    // input parameter not empty

    client.queryScene({ status: req.body.clientStatus }, function (err, response) {
        if (err) {
            console.error('Error: ', err)
        } else {
            console.log("Server status : ", response.status, "Client Status : ", req.body.clientStatus);
            if (response.status > req.body.clientStatus) {
                console.log(response.models);
                models = response.models;
                res.json({ models: models, status: response.status });
            }
            else {
                res.json({ models: "", status: response.status });
            }
            
        }
    })


});

console.log("init ok");

app.listen(3000);