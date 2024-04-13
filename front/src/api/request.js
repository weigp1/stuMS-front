import axios from 'axios';
import EnvConfig from '../config';
import { ElMessage } from 'element-plus';


// 创建axios实例
const service = axios.create({
  baseURL: EnvConfig.baseApi,
});

// 请求之前
service.interceptors.request.use((req) => {
  // jwt-token认证
  const jwtToken = localStorage.getItem('jwtToken');
  if (jwtToken) {
    req.headers.Authorization = `Bearer ${jwtToken}`;
  }
  return req;
});

// 请求之后
service.interceptors.response.use((res) => {
  console.log(res.data);
  const { code, data, msg } = res.data;
  console.log(code);
  if (code == 200) {
    return data;
  } 
  else if(code == 101)
  {
    ElMessage.error('登录已过期，请重新登录！');
    return Promise.reject(code);
  }
  else if (code == 404) {
    ElMessage.error('网络请求失败！');
  } 
  else {
    ElMessage.error(msg || '网络请求异常！');
    return Promise.reject(msg || '网络请求异常！');
  }
});

// 封装的核心函数
function request(options) {
  if (options.method.toLowerCase() == 'post') {
    options.params = options.data;
  }
  //对mock的处理
  let isMock = options.mock;
  service.defaults.baseURL = isMock ? EnvConfig.mockApi : EnvConfig.baseApi;
  return service(options);
}

export default request;