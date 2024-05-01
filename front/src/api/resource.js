import axios from 'axios';  // 导入axios库

// 上传文件函数
async function uploadFile(file) {
  try {
    // 发送PUT请求上传文件到预签名URL
    const response = await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,  // 设置请求头中的Content-Type字段为文件类型
      },
    });
    console.log('Successful: ',response.data);  // 打印上传成功的响应数据
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
  uploadFile, downloadFile
};
