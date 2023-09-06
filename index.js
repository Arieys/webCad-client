const ejs = require('ejs');
const express = require('express');
const app = express();

const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.join(__dirname, 'helloworld.proto');
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

const hello_proto = protoDescriptor.helloworld;
const ModelService = hello_proto.Greeter;

// 创建客户端
const client = new ModelService('localhost:50052', grpc.credentials.createInsecure());
// 构造请求消息
var obj_files;
// 调用服务

client.sayHello({ name: 'Hello ys' }, function (err, response) {
    if (err) {
        console.error('Error: ', err)
    } else {
        console.log(response.message)
    }
})

let position_data = [1.0,1.0,1.0];
let normal_data = [];

app.use(express.static('webgl', { 'extensions': ['js', 'css'] }));

// 在模板中动态传递参数
app.get('/', function (req, res) {
  console.log("111");
  const params = {
    position_data: JSON.stringify(position_data),
    normal_data: JSON.stringify(normal_data),
    obj_files: JSON.stringify(obj_files)
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

app.listen(3000);