/*
 * 整个项目api的管理
 */
import request from './request';

function Test() 
{
  return request({
    url: '/test',
    method: 'get',
    mock: true,
  });
};

function Login(params) 
{
  return request({
    url: '/auth/login',
    method: 'post',
    mock: false,
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export {
  Test, Login
};