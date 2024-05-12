/* 整个项目api的管理 */

import request from './request';
// function Test_Login(params) 
// {
//   return request({
//     url: 'auth-service/auth/login',
//     method: 'GET',
//     mock: true,
//     params: params,
//   });
// };

/* 登录相关 */
function Login(params) 
{
  return request({
    url: 'auth-service/auth/login',
    method: 'GET',
    mock: false,
    params: params,
  });
}

function Login(params) 
{
  return request({
    url: 'auth-service/auth/login',
    method: 'GET',
    mock: false,
    params: params,
  });
}

/* 用户相关 */


/* 综测相关 */


/* 分数相关 */

export {
  Login
};
