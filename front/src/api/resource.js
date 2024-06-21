import axios from 'axios';  // 导入axios库

  const expiryTimeInSeconds = 60 * 60; // 设置过期时间为1小时

// 定义函数来向服务器请求预签名 URL
async function PutPresignedURL(bucketName, objectName) {
  try {
    const response = await axios.get('http://localhost:3000/PutObjectPresignedURL', {
      params: {
        bucketName,
        objectName,
        expiryTimeInSeconds,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error: ', error.message);
    throw error;
  }
}


// 上传文件函数
async function uploadFile(bucketName, objectName, file) {
  try {
    // 获取预签名URL
    const presignedURL = await PutPresignedURL(bucketName, objectName);
    await axios.put(presignedURL, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
  } catch (error) {
    console.error('Error: ', error.message);
  }
}

// 定义函数来向服务器请求预签名 URL
async function GetPresignedURL(bucketName, objectName) {
  try {
    const response = await axios.get('http://localhost:3000/GetObjectPresignedURL', {
      params: {
        bucketName,
        objectName,
        expiryTimeInSeconds,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error: ', error.message);
    throw error;
  }
}

// 下载文件函数
async function downloadFile(bucketName, objectName) {
  try {
    // 获取预签名URL
    const presignedURL = await GetPresignedURL(bucketName, objectName);

    // 发送GET请求到预签名URL
    const response = await axios.get(presignedURL, {
      responseType: 'blob',  // 设置响应类型为blob
    });

    // 创建下载链接并触发下载
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', objectName);  // 设置下载文件的名称
    document.body.appendChild(link);
    link.click();

    // 释放URL对象
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error: ', error.message);
  }
}

// 下载文件函数
async function fileUrl(bucketName, objectName) {
  try {
    // 获取预签名URL
    const presignedURL = await GetPresignedURL(bucketName, objectName);
    return presignedURL;
  } catch (error) {
    console.error('Error: ', error.message);
  }
}

// 导出上传文件和下载文件函数
export {
  uploadFile, downloadFile, fileUrl
};






