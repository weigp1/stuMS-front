/*
 * 整个项目api的管理
 */
import request from './request';

function Test_Login(params) 
{
  return request({
    url: 'auth-service/auth/login',
    method: 'post',
    mock: true,
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

function Login(params) 
{
  return request({
    url: 'auth-service/auth/login',
    method: 'post',
    mock: false,
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export {
  Test_Login, Login
};