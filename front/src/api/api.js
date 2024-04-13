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

function GetUser(params) 
{
  return request({
    url: '/test',
    method: 'post',
    mock: false,
    data: params,
    headers: {
      'Content-Type': 'application/json', // 设置请求头
    },
  });
}

export {
  Test, GetUser
};