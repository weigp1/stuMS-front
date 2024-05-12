import axios from 'axios';  // 导入axios库
import EnvConfig from '../config/URL';  // 导入环境配置文件
import { ElMessage } from 'element-plus';  // 导入Element Plus库中的消息提示组件

// 创建axios实例
const service = axios.create({
  baseURL: EnvConfig.baseApi,
  
});
// 请求之前的拦截器
service.interceptors.request.use((req) => {
  // 获取本地存储中的JWT Token
  const jwtToken = localStorage.getItem('jwtToken');
  // 如果存在JWT Token，则在请求头中添加名为 "token" 的字段
  if (jwtToken) {
    req.headers.token = jwtToken;
  }
  return req;  // 返回请求配置对象
});

// 请求之后的拦截器
service.interceptors.response.use(
  (res) => {
    // res.data包括code和data两个字段
    return res.data;
  },
  (error) => {
    ElMessage.error('网络请求出错！');
    return Promise.reject(error);
  }
);

// 封装的核心函数
function request(options) {
  // 对是否使用Mock的处理
  let isMock = options.mock;  // 获取是否使用Mock的标志
  service.defaults.baseURL = isMock ? EnvConfig.mockApi : EnvConfig.baseApi;  // 根据标志设置axios实例的baseURL
  return service(options);  // 返回axios实例发送请求后的Promise
}

export default request;  // 导出request函数
