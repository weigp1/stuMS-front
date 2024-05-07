import axios from 'axios';  // 导入axios库

// 定义函数来向服务器请求预签名 URL
async function getPresignedURL(bucketName, objectName, expiryTimeInSeconds) {
  const response = await axios.get('http://localhost:3000/generatePresignedURL', {
    params: {
      bucketName,
      objectName,
      expiryTimeInSeconds
    }
  });
  return response.data;
}

// 上传文件函数
async function uploadFile(presignedURL, file) {
  try {
    // 发送PUT请求预签名URL
    await axios.put(presignedURL, file, {
      headers: {
        'Content-Type': file.type,  // 设置请求头中的Content-Type字段为文件类型
      },
    });
  } catch (error) {
    console.error('Error: ', error.message);  // 打印上传失败的错误信息
  }
}

// 下载文件函数
async function downloadFile(downloadUrl, name){
  try {
    // 使用Axios发送GET请求下载文件，设置响应数据类型为blob
    const response = await axios.get(downloadUrl, {
      responseType: 'blob', 
    });

    // 创建Blob对象，并生成Blob URL
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);

    // 创建一个虚拟的下载链接并触发点击，下载文件
    const link = document.createElement('a');
    link.href = url;
    link.download = name;  // 设置下载文件的名称
    document.body.appendChild(link);  // 将虚拟链接添加到文档中
    link.click();  // 触发链接点击事件进行下载

    // 释放Blob URL资源
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error:', error.message);  // 打印下载失败的错误信息
  }
};

// 导出上传文件和下载文件函数
export {
  getPresignedURL, uploadFile, downloadFile
};

//






