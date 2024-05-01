import axios from 'axios';  // 导入axios库
import EnvConfig from '../config/URL';  // 导入环境配置文件
import { ElMessage } from 'element-plus';  // 导入Element Plus库中的消息提示组件

// 创建axios实例
const service = axios.create({
  baseURL: EnvConfig.baseApi,  // 设置axios实例的基础URL为环境配置文件中的baseApi字段
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
service.interceptors.response.use((res) => {
  const {code, data} = res;  // 从响应中解构出状态码和数据
  if (code == 200) {  // 如果状态码为200，表示请求成功
    return data;  // 返回响应数据
  } 
  else if(code == 401)  // 如果状态码为401，表示未授权
  {
    ElMessage.error('登录已过期，请重新登录！');  // 提示登录已过期
    return Promise.reject(code);  // 返回一个带有状态码的rejected Promise
  }
  else if (code == 404) {  // 如果状态码为404，表示请求的资源未找到
    ElMessage.error('网络请求失败！');  // 提示网络请求失败
    return Promise.reject('网络请求失败！');  // 返回一个带有错误信息的rejected Promise
  } 
  else {  // 其他情况，可能是服务器异常等
    ElMessage.error('网络请求异常！');  // 提示网络请求异常
    return Promise.reject('网络请求异常！');  // 返回一个带有错误信息的rejected Promise
  }
});

// 封装的核心函数
function request(options) {
  if (options.method.toLowerCase() == 'post') {  // 如果请求方法为POST
    options.params = options.data;  // 将请求参数放入params字段中
  }
  // 对是否使用Mock的处理
  let isMock = options.mock;  // 获取是否使用Mock的标志
  service.defaults.baseURL = isMock ? EnvConfig.mockApi : EnvConfig.baseApi;  // 根据标志设置axios实例的baseURL
  return service(options);  // 返回axios实例发送请求后的Promise
}

export default request;  // 导出request函数
