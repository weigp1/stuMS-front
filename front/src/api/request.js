import axios from 'axios';
import EnvConfig from '../config/URL';
import { AuthStore } from '../stores/auth'
import { ElMessage, vLoading } from 'element-plus';

// 创建axios实例
const service = axios.create({
  baseURL: EnvConfig.baseApi,
  timeout: 10000,
  
});

// 请求之前的拦截器
service.interceptors.request.use((req) => {
  // 获取JWT Token
  const { token } = AuthStore()
  if (token) {
    req.headers.token = token;
  }

  return req;
});


// 请求之后的拦截器
service.interceptors.response.use(
  (res) => {
    const { code, data } = res.data
    const authStore = AuthStore()
    if (code === 4003) {
      authStore.forceOffline()
      return ;
    }
    return res.data;
  },
  (error) => {
    ElMessage.error('网络请求出错！');
    return Promise.reject(error);
  }
);

// 封装的核心函数
function request(options) {
  let isMock = options.mock;  // 是否使用Mock
  service.defaults.baseURL = isMock ? EnvConfig.mockApi : EnvConfig.baseApi;  // 根据标志设置axios实例的baseURL
  return service(options);  // 返回axios实例发送请求后的Promise
}

export default request;
