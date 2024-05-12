/*
 * 整个项目api的管理
 */
import request from './request';

function Test_Login(params) 
{
  return request({
    url: 'auth-service/auth/login',
    method: 'GET',
    mock: true,
    params: params,
  });
};

function Login(params) 
{
  return request({
    url: 'auth-service/auth/login',
    method: 'GET',
    mock: false,
    params: params,
  });
}


export {
  Test_Login, Login
};
