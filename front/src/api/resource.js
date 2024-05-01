import axios from 'axios';

// 上传
async function uploadFile(file) {
  try {
      const response = await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
      console.log('Successful: ',response.data);
    } catch (error) {
      console.error('Error: ', error.message);
    }
}

// 下载
async function downloadFile(downloadUrl, name){
  try {
    // 使用Axios发送GET请求下载文件
    const response = await axios.get(downloadUrl, {
      responseType: 'blob', // 指定响应类型为二进制数据
    });

    // 创建Blob URL，并创建链接用于下载
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);

    // 创建一个虚拟的下载链接并触发点击
    const link = document.createElement('a');
    link.href = url;
    link.download = name; 
    document.body.appendChild(link);
    link.click();

    // 释放Blob URL资源
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export {
  uploadFile, downloadFile
};
