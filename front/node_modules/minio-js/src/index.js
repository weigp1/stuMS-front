export const Minio = require("minio");


let MinioConfig = null;

export function initMinio(config) {
  if (!config) {
    throw new Error("Minio的配置不能为空");
  }
  console.log("MinioJs.config:");
  console.log(config);
  MinioConfig = config;
}

//封装的上传到minio
export function putObject(bucketName, file, fileName, callback) {
  if (!MinioConfig) {
    throw new Error("请先初始化Minio");
  }
  console.log("MinioJs.putObject");
  let buf = Buffer.from(file); //Buffer
  var Minio = require("minio");
  var minioClient = new Minio.Client(MinioConfig);
  minioClient.putObject(bucketName, fileName, buf, callback
    // function (err, data) {
    //   if (err) console.log(err);
    //   else console.log("Successfully uploaded data to testbucket/testobject");
    // }
  );
}


//测试用
function putObjectTest(bucketName, file, fileName) {
  console.log("MinioJs.putObject:");
  console.log(file);
  let buf = Buffer.from(file); //Buffer
  var Minio = require("minio");
  var minioClient = new Minio.Client({
    endPoint: "192.168.2.98",
    port: 9002,
    useSSL: false,
    accessKey: "admin",
    secretKey: "12345678",
  });
  minioClient.putObject(bucketName, fileName, buf, function (err, data) {
    if (err) console.log(err);
    else console.log("Successfully uploaded data to testbucket/testobject");
  });
}
